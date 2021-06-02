<template>
	<AppTopCenter>
		<template v-slot:page>
			<v-col class="pb-10">
				<v-card v-if="pendingUsersList.length !== 0">
					<v-card-title>
						<div>待審核帳戶</div>
					</v-card-title>

					<v-data-table
						:headers="headers"
						:items="pendingUsersList"
						:items-per-page="pendingItemsPerPage"
						:server-items-length="pendingUsersCount"
						:options.sync="pendingTableOptions"
						sort-by="userName"
						class="elevation-1 mb-4"
					>
						<template v-slot:[`item.actions`]="{ item }">
							<v-icon size="20" color="accent" class="mr-3" @click="prepareEditedItem({ item: item, dialogMode: 'dialogEdit' })">
								mdi-pencil
							</v-icon>
							<v-icon size="20" color="error" @click="prepareEditedItem({ item: item, dialogMode: 'dialogDelete' })"> mdi-delete </v-icon>
						</template>
						<template v-slot:no-data>
							<v-btn color="primary" @click="getDataFromApi()"> Reset </v-btn>
						</template>
					</v-data-table>
				</v-card>

				<v-card>
					<v-card-title>
						<div>帳戶管理</div>
						<v-spacer></v-spacer>
						<v-text-field
							class="pt-0 mt-0"
							v-model.lazy="searchKeyword"
							append-icon="mdi-magnify"
							label="搜尋姓名 / 帳戶名稱 / 電子信箱"
							single-line
							hide-details
						></v-text-field>
					</v-card-title>
					<v-data-table
						:headers="headers"
						:items="vetifiedUsersList"
						:server-items-length="verifiedUsersCount"
						:options.sync="verifiedTableOptions"
						:loading="loadingVerifiedTable"
						sort-by="userName"
						class="elevation-1"
					>
						<template v-slot:top>
							<v-toolbar flat>
								<v-spacer></v-spacer>
								<v-dialog v-model="dialogEdit" max-width="550px">
									<template v-slot:activator="{ on, attrs }">
										<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> 新增帳戶 </v-btn>
									</template>
									<validation-observer ref="observer" v-slot="{ invalid }">
										<v-card>
											<v-card-title>
												<span class="text-h6">{{ formTitle }}</span>
											</v-card-title>

											<v-card-text>
												<v-container>
													<v-row>
														<v-col cols="12" sm="6" class="py-0">
															<validation-provider v-slot="{ errors }" rules="required|max:16" name="姓氏">
																<v-text-field
																	v-model="editedItem.surname"
																	:counter="16"
																	:error-messages="errors"
																	label="姓氏"
																></v-text-field>
															</validation-provider>
														</v-col>
														<v-col cols="12" sm="6" class="py-0">
															<validation-provider v-slot="{ errors }" rules="required|max:16" name="名子">
																<v-text-field v-model="editedItem.name" :counter="16" :error-messages="errors" label="名子"></v-text-field>
															</validation-provider>
														</v-col>
														<v-col cols="12" class="py-0">
															<validation-provider v-slot="{ errors }" rules="required|max:16" name="帳戶名稱">
																<v-text-field
																	v-model="editedItem.userName"
																	:counter="16"
																	:error-messages="errors"
																	label="帳戶名稱"
																></v-text-field>
															</validation-provider>
														</v-col>
														<v-col cols="12" class="py-0">
															<validation-provider v-slot="{ errors }" rules="required|email" name="電子信箱">
																<v-text-field v-model="editedItem.emailAddress" :error-messages="errors" label="電子信箱"></v-text-field>
															</validation-provider>
														</v-col>
														<v-col cols="12" class="py-0">
															<v-text-field v-model="editedItem.phone" label="連絡電話"></v-text-field>
														</v-col>
													</v-row>
													<v-row>
														<v-col cols="12" class="text-subtitle-1 pb-0">身分選項</v-col>
														<v-col v-for="(role, index) in roleList" :key="index" cols="6" class="py-0">
															<v-checkbox
																v-model="editedItem.roleNames"
																:label="role.displayName"
																color=""
																:value="role.normalizedName"
																hide-details
																class="mt-3"
															></v-checkbox>
														</v-col>
													</v-row>
												</v-container>
											</v-card-text>

											<v-card-actions class="pb-4">
												<v-spacer></v-spacer>
												<v-btn color="blue darken-1" text @click="closeDialog('dialogEdit')"> 取消 </v-btn>
												<v-btn color="blue darken-1" text @click="editItemConfirm()" :disabled="invalid"> 儲存 </v-btn>
												<v-btn color="warning darken-1" text v-if="!editedItem.isActive" @click="verifyItemConfirm()" :disabled="invalid">
													審核
												</v-btn>
											</v-card-actions>
										</v-card>
									</validation-observer>
								</v-dialog>
								<v-dialog v-model="dialogDelete" max-width="550px">
									<v-card>
										<v-card-title v-if="editedItem.isActive" class="text-h6">即將刪除此角色，是否繼續?</v-card-title>
										<v-card-title v-else class="text-h6">即將刪除此審核請求，是否繼續?</v-card-title>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="closeDialog('dialogDelete')"> 取消 </v-btn>
											<v-btn color="error darken-1" text @click="deleteItemConfirm()"> 刪除 </v-btn>
											<v-spacer></v-spacer>
										</v-card-actions>
									</v-card>
								</v-dialog>
							</v-toolbar>
						</template>
						<template v-slot:[`item.roleNames`]="{ item }">
							<div v-for="(roleName, index) in item.roleNames" :key="index" class="py-1">{{ roleName }}</div>
						</template>
						<template v-slot:[`item.actions`]="{ item }">
							<v-icon size="20" color="accent" class="mr-3" @click="prepareEditedItem({ item: item, dialogMode: 'dialogEdit' })">
								mdi-pencil
							</v-icon>
							<v-icon size="20" color="error" @click="prepareEditedItem({ item: item, dialogMode: 'dialogDelete' })"> mdi-delete </v-icon>
						</template>
						<template v-slot:no-data>
							<v-btn color="primary" @click="getDataFromApi()"> Reset </v-btn>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</template>
	</AppTopCenter>
</template>

<script>
import AppTopCenter from '@/views/widget/AppTopCenter.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'RoleManagement',
	components: {
		AppTopCenter
	},

	data: () => ({
		loadingVerifiedTable: false,

		verifiedTableOptions: {},
		pendingTableOptions: {},

		verifiedTablePagedParams: {},
		pendingTablePagedParams: {},

		pendingItemsPerPage: 5,
		verifiedItemsPerPage: 10,

		searchKeyword: '',

		dialogEdit: false,
		dialogDelete: false,

		headers: [
			{ text: '姓名', align: 'start', value: 'fullName', sortable: false },
			{ text: '帳戶名稱', value: 'userName', sortable: false },
			{ text: '電子信箱', value: 'emailAddress', sortable: false },
			{ text: '聯絡電話', value: 'phone', sortable: false },
			{ text: '身分類別', value: 'roleNames', sortable: false },
			{ text: '編輯動作', value: 'actions', sortable: false }
		],

		editedIndex: -1,
		editedItem: {
			surname: '',
			name: '',
			userName: '',
			emailAddress: '',
			phone: '',
			roleNames: [],
			isActive: Boolean
		},

		defaultItem: {
			surname: '',
			name: '',
			userName: '',
			emailAddress: '',
			phone: '',
			roleNames: [],
			isActive: Boolean
		}
	}),

	computed: {
		...mapGetters('user', ['vetifiedUsersList', 'pendingUsersList', 'verifiedUsersCount', 'pendingUsersCount']),
		...mapGetters('roles', ['roleList']),

		formTitle() {
			return this.editedIndex === -1 ? '新增帳戶' : '編輯帳戶';
		}
	},

	watch: {
		dialogEdit(val) {
			val || this.closeDialog('dialogEdit');
		},

		dialogDelete(val) {
			val || this.closeDialog('dialogDelete');
		},

		verifiedTableOptions: {
			handler() {
				this.loadingVerifiedTable = true;

				this.verifiedTablePagedParams.MaxResultCount =
					this.verifiedTableOptions.itemsPerPage !== -1 ? this.verifiedTableOptions.itemsPerPage : this.verifiedUsersCount;
				this.verifiedTablePagedParams.SkipCount =
					this.verifiedTableOptions.itemsPerPage * this.verifiedTableOptions.page - this.verifiedTableOptions.itemsPerPage;

				this.getVetifiedUsers(this.verifiedTablePagedParams);
			},
			deep: true
		},

		pendingTableOptions: {
			handler() {
				this.pendingTablePagedParams.MaxResultCount =
					this.pendingTableOptions.itemsPerPage !== -1 ? this.pendingTableOptions.itemsPerPage : this.pendingUsersCount;
				this.pendingTablePagedParams.SkipCount =
					this.pendingTableOptions.itemsPerPage * this.pendingTableOptions.page - this.pendingTableOptions.itemsPerPage;

				this.getPendingUsers(this.pendingTablePagedParams);
			},
			deep: true
		},

		// Immediately search
		searchKeyword: {
			handler() {
				// Use timeout (debounce)
				this.searchTimeOut();
			}
		}
	},

	created() {
		this.getDataFromApi();
	},

	methods: {
		...mapActions('user', ['getUsersByParams', 'createUser', 'deleteUser', 'updateUser']),
		...mapActions('roles', ['getRoles']),

		getDataFromApi() {
			this.loadingVerifiedTable = true;
			this.getVetifiedUsers(this.verifiedTablePagedParams);
			this.getPendingUsers(this.pendingTablePagedParams);
			this.getRoles();
		},

		getVetifiedUsers(params) {
			console.log('RoleManagement.vue getVetifiedUsers this.verifiedTableOptions', this.verifiedTableOptions);
			this.getUsersByParams({ isActive: true, ...params }).then(() => {
				this.loadingVerifiedTable = false;
			});
		},

		getPendingUsers(params) {
			this.getUsersByParams({ isActive: false, ...params });
		},

		searchTimeOut() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				this.loadingVerifiedTable = true;
				this.verifiedTablePagedParams.Keyword = this.searchKeyword;
				this.getVetifiedUsers(this.verifiedTablePagedParams);
			}, 800);
		},

		prepareEditedItem(payload) {
			const { item, dialogMode } = payload;

			if (item.isActive) {
				this.editedIndex = this.vetifiedUsersList.indexOf(item);
			} else {
				this.editedIndex = this.pendingUsersList.indexOf(item);
			}

			this.editedItem = Object.assign({}, item);
			this[dialogMode] = true;
		},

		editItemConfirm() {
			if (this.editedIndex === -1) {
				const payload = Object.assign({}, this.editedItem);
				payload.isActive = true;
				payload.password = this.editedItem.userName;

				this.createUser(payload).then(() => {
					this.getDataFromApi();
					this.closeDialog('dialogEdit');
				});
			} else {
				this.updateUser(this.editedItem).then(() => {
					this.getDataFromApi();
					this.closeDialog('dialogEdit');
				});
			}
		},

		deleteItemConfirm() {
			this.deleteUser(this.editedItem.id).then(() => {
				this.getDataFromApi();
				this.closeDialog('dialogDelete');
			});
		},

		verifyItemConfirm() {
			if (!this.editedItem.isActive) {
				this.editedItem.isActive = true;
				this.updateUser(this.editedItem).then(() => {
					this.getDataFromApi();
					this.closeDialog('dialogEdit');
				});
			} else {
				console.error('This account has been verified');
			}
		},

		closeDialog(dialogMode) {
			this[dialogMode] = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
				if (dialogMode === 'dialogEdit') this.resetFormValidate();
			});
		},

		resetFormValidate() {
			this.$refs.observer.reset();
		}
	}
};
</script>

<style scoped></style>
