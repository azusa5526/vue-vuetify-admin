<template>
	<AppTopCenter>
		<template v-slot:page>
			<v-col>
				<v-card>
					<v-card-title>
						<div>帳戶管理</div>
						<v-spacer></v-spacer>
						<v-text-field class="pt-0 mt-0" v-model="search" append-icon="mdi-magnify" label="搜尋" single-line hide-details></v-text-field>
					</v-card-title>

					<v-data-table :headers="headers" :items="allUsersList" :search="search" sort-by="userName" class="elevation-1">
						<template v-slot:top>
							<v-toolbar flat>
								<v-spacer></v-spacer>
								<v-dialog v-model="dialog" max-width="550px">
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
												<v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
												<v-btn color="blue darken-1" text @click="editItemConfirm()" :disabled="invalid"> 儲存 </v-btn>
											</v-card-actions>
										</v-card>
									</validation-observer>
								</v-dialog>
								<v-dialog v-model="dialogDelete" max-width="550px">
									<v-card>
										<v-card-title class="text-h6">即將刪除此角色，是否繼續</v-card-title>
										<v-card-actions>
											<v-spacer></v-spacer>
											<v-btn color="blue darken-1" text @click="closeDelete"> 取消 </v-btn>
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
							<v-icon size="20" color="accent" class="mr-3" @click="prepareEditedItem(item)"> mdi-pencil </v-icon>
							<v-icon size="20" color="error" @click="prepareDeletedItem(item)"> mdi-delete </v-icon>
						</template>
						<template v-slot:no-data>
							<v-btn
								color="primary"
								@click="
									getAllUsers();
									getRoles();
								"
							>
								Reset
							</v-btn>
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
		search: '',
		dialog: false,
		dialogDelete: false,
		headers: [
			{ text: '姓名', align: 'start', value: 'fullName' },
			{ text: '帳戶名稱', value: 'userName' },
			{ text: '電子信箱', value: 'emailAddress', sortable: false },
			{ text: '聯絡電話', value: 'phone' },
			{ text: '身分類別', value: 'roleNames' },
			{ text: '編輯動作', value: 'actions', sortable: false }
		],
		editedIndex: -1,
		editedItem: {
			surname: '',
			name: '',
			userName: '',
			emailAddress: '',
			phone: '',
			roleNames: []
		},

		defaultItem: {
			surname: '',
			name: '',
			userName: '',
			emailAddress: '',
			phone: '',
			roleNames: []
		}
	}),

	computed: {
		...mapGetters('user', ['allUsersList']),
		...mapGetters('roles', ['roleList']),

		formTitle() {
			return this.editedIndex === -1 ? '新增帳戶' : '編輯帳戶';
		}
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		}
	},

	created() {
		this.getAllUsers();
		this.getRoles();
	},

	methods: {
		...mapActions('user', ['getAllUsers', 'createUser', 'deleteUser', 'updateUser']),
		...mapActions('roles', ['getRoles']),

		prepareEditedItem(item) {
			this.editedIndex = this.allUsersList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		prepareDeletedItem(item) {
			this.editedIndex = this.allUsersList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		editItemConfirm() {
			if (this.editedIndex === -1) {
				const payload = Object.assign({}, this.editedItem);
				payload.isActive = true;
				payload.password = this.editedItem.userName;
				console.log('RoleManagement.vue editItemConfirm payload', payload);

				this.createUser(payload).then(() => {
					this.getAllUsers();
					this.getRoles();
					this.close();
				});
			} else {
				this.updateUser(this.editedItem).then(() => {
					this.getAllUsers();
					this.getRoles();
					this.close();
				});
			}
		},

		deleteItemConfirm() {
			this.deleteUser(this.editedItem.id).then(() => {
				this.getAllUsers();
				this.getRoles();
				this.closeDelete();
			});
		},

		close() {
			this.resetFormValidate();
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		resetFormValidate() {
			this.$refs.observer.reset();
		}
	}
};
</script>

<style scoped></style>
