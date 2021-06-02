<template>
	<AppTopCenter>
		<template v-slot:page>
			<v-col>
				<v-card>
					<v-card-title>
						<div>權限管理</div>
						<v-spacer></v-spacer>
						<v-text-field
							class="pt-0 mt-0"
							v-model.lazy="searchKeyword"
							append-icon="mdi-magnify"
							label="搜尋權限-角色名稱 / 顯示名稱 / 描述"
							single-line
							hide-details
						></v-text-field>
					</v-card-title>

					<v-data-table
						:headers="headers"
						:items="roleList"
						:server-items-length="rolesCount"
						:options.sync="tableOptions"
						:loading="loadingTable"
						class="elevation-1"
					>
						<template v-slot:top>
							<v-toolbar flat>
								<v-spacer></v-spacer>
								<v-dialog v-model="dialogEdit" max-width="550px">
									<template v-slot:activator="{ on, attrs }">
										<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> 新增權限-角色 </v-btn>
									</template>
									<validation-observer ref="observer" v-slot="{ invalid }">
										<v-form>
											<v-card>
												<v-card-title>
													<span class="text-h6">{{ formTitle }}</span>
												</v-card-title>

												<v-card-text>
													<v-container>
														<v-row>
															<v-col cols="12" class="py-0">
																<validation-provider v-slot="{ errors }" rules="required|max:32" name="權限-角色名稱">
																	<v-text-field
																		v-model="editedItem.name"
																		:counter="32"
																		:error-messages="errors"
																		label="權限-角色名稱"
																	></v-text-field>
																</validation-provider>
															</v-col>
															<v-col cols="12" class="py-0">
																<validation-provider v-slot="{ errors }" rules="required|max:32" name="顯示名稱">
																	<v-text-field
																		v-model="editedItem.displayName"
																		:counter="32"
																		:error-messages="errors"
																		label="顯示名稱"
																	></v-text-field>
																</validation-provider>
															</v-col>
															<v-col cols="12" class="py-0">
																<v-text-field v-model="editedItem.description" label="角色描述"></v-text-field>
															</v-col>
														</v-row>
														<v-row>
															<v-col cols="12" class="text-subtitle-1 pb-0">權限選項</v-col>
															<v-col v-for="(permission, index) in allPermissions" :key="index" cols="6" class="py-0">
																<v-checkbox
																	v-model="editedItem.grantedPermissions"
																	:label="permission"
																	color=""
																	:value="permission"
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
												</v-card-actions>
											</v-card>
										</v-form>
									</validation-observer>
								</v-dialog>
								<v-dialog v-model="dialogDelete" max-width="550px">
									<v-card>
										<v-card-title class="text-h6">即將刪除此角色，是否繼續</v-card-title>
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
						<template v-slot:[`item.actions`]="{ item }">
							<v-icon size="20" color="accent" class="mr-3" @click="prepareEditedItem({ item: item, dialogMode: 'dialogEdit' })">
								mdi-pencil
							</v-icon>
							<v-icon size="20" color="error" @click="prepareEditedItem({ item: item, dialogMode: 'dialogDelete' })"> mdi-delete </v-icon>
						</template>
						<template v-slot:no-data>
							<v-btn color="primary" @click="getRoles()"> Reset </v-btn>
						</template>
					</v-data-table>
				</v-card>
			</v-col>
		</template>
	</AppTopCenter>
</template>

<script>
import AppTopCenter from '@/views/widget/AppTopCenter.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'PermissionManagement',
	components: {
		AppTopCenter
	},
	data: () => ({
		loadingTable: false,
		tableOptions: {
			MaxResultCount: 0,
			SkipCount: 0,
			Keyword: ''
		},
		tablePagedParams: {},
		itemsPerPage: 10,
		searchKeyword: '',

		dialogEdit: false,
		dialogDelete: false,

		headers: [
			{
				text: '權限-角色名稱',
				align: 'start',
				value: 'name',
				sortable: false
			},
			{ text: '顯示名稱', value: 'displayName', sortable: false },
			{ text: '描述', value: 'description', sortable: false },

			{ text: '編輯動作', value: 'actions', sortable: false }
		],

		editedIndex: -1,
		editedItem: {
			name: '',
			displayName: '',
			description: '',
			grantedPermissions: [],
			normalizedName: ''
		},

		defaultItem: {
			name: '',
			displayName: '',
			description: '',
			grantedPermissions: []
		}
	}),

	computed: {
		...mapGetters('roles', ['roleList', 'rolesCount']),
		...mapGetters('user', ['allPermissions']),

		formTitle() {
			return this.editedIndex === -1 ? '新增權限-角色' : '編輯權限-角色';
		}
	},

	watch: {
		dialogEdit(val) {
			val || this.closeDialog('dialogEdit');
		},

		dialogDelete(val) {
			val || this.closeDialog('dialogDelete');
		},

		tableOptions: {
			handler() {
				this.loadingTable = true;
				// this.tablePagedParams = {
				// 	MaxResultCount: this.tableOptions.itemsPerPage !== -1 ? this.tableOptions.itemsPerPage : this.rolesCount,
				// 	SkipCount: this.tableOptions.itemsPerPage * this.tableOptions.page - this.tableOptions.itemsPerPage
				// };
				this.tablePagedParams.MaxResultCount = this.tableOptions.itemsPerPage !== -1 ? this.tableOptions.itemsPerPage : this.rolesCount;
				this.tablePagedParams.SkipCount = this.tableOptions.itemsPerPage * this.tableOptions.page - this.tableOptions.itemsPerPage;

				console.log('PermissionManagement.vue tableOptions tablePagedParams', this.tablePagedParams);
				this.getRolesByParams(this.tablePagedParams).then(() => {
					this.loadingTable = false;
				});
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
		this.getRolesByParams().then(() => {
			this.loadingTable = false;
		});
	},

	methods: {
		...mapActions('roles', ['getRoles', 'getRolesByParams', 'addRole', 'updateRole', 'deleteRole']),

		// Blur search
		// searchDataByKeyword() {
		// 	this.loadingTable = true;
		// 	this.tablePagedParams.Keyword = this.searchKeyword;
		// 	this.getRolesByParams(this.tablePagedParams).then(() => {
		// 		this.loadingTable = false;
		// 	});
		// },

		searchTimeOut() {
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(() => {
				this.loadingTable = true;
				this.tablePagedParams.Keyword = this.searchKeyword;
				this.getRolesByParams(this.tablePagedParams).then(() => {
					this.loadingTable = false;
				});
			}, 800);
		},

		prepareEditedItem(payload) {
			const { item, dialogMode } = payload;

			this.editedIndex = this.roleList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this[dialogMode] = true;
		},

		editItemConfirm() {
			if (this.editedIndex === -1) {
				this.addRole(this.editedItem).then((result) => {
					if (result) {
						this.getRolesByParams(this.tablePagedParams).then(() => {
							this.loadingTable = false;
						});
						this.closeDialog('dialogEdit');
					} else {
						console.error('PermissionManagement.vue editItemConfirm addRoles Error', result);
						this.closeDialog('dialogEdit');
					}
				});
			} else {
				this.updateRole(this.editedItem).then((result) => {
					if (result) {
						this.getRolesByParams(this.tablePagedParams).then(() => {
							this.loadingTable = false;
						});
						this.closeDialog('dialogEdit');
					} else {
						console.error('PermissionManagement.vue editItemConfirm updateRole Error', result);
						this.closeDialog('dialogEdit');
					}
				});
			}
		},

		deleteItemConfirm() {
			this.deleteRole(this.editedItem).then((result) => {
				if (result) {
					this.getRolesByParams(this.tablePagedParams).then(() => {
						this.loadingTable = false;
					});
					this.closeDialog('dialogDelete');
				} else {
					console.error('PermissionManagement.vue deleteItemConfirm deleteRole Error', result);
					this.closeDialog('dialogDelete');
				}
			});
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
