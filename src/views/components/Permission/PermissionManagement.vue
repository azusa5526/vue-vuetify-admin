<template>
	<AppTopCenter>
		<template v-slot:page>
			<v-col>
				<v-card>
					<v-card-title>
						<div>權限管理</div>
						<v-spacer></v-spacer>
						<v-text-field class="pt-0 mt-0" v-model="search" append-icon="mdi-magnify" label="搜尋" single-line hide-details></v-text-field>
					</v-card-title>
				</v-card>
				<v-data-table :headers="headers" :items="roleList" :search="search" sort-by="calories" class="elevation-1">
					<template v-slot:top>
						<v-toolbar flat>
							<v-spacer></v-spacer>
							<v-dialog v-model="dialog" max-width="550px">
								<template v-slot:activator="{ on, attrs }">
									<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on"> 新增權限-角色 </v-btn>
								</template>
								<v-form ref="form" v-model="valid" lazy-validation>
									<v-card>
										<v-card-title>
											<span class="text-h6">{{ formTitle }}</span>
										</v-card-title>

										<v-card-text>
											<v-container>
												<v-row>
													<v-col cols="12" class="py-0">
														<v-text-field v-model="editedItem.name" label="權限-角色名稱" :rules="nameRules" required></v-text-field>
													</v-col>
													<v-col cols="12" class="py-0">
														<v-text-field
															v-model="editedItem.displayName"
															label="顯示名稱"
															:rules="displayNameRules"
															required
														></v-text-field>
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
											<v-btn color="blue darken-1" text @click="close"> 取消 </v-btn>
											<v-btn color="blue darken-1" text @click="editItemConfirm()"> 儲存 </v-btn>
										</v-card-actions>
									</v-card>
								</v-form>
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
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon size="20" color="accent" class="mr-3" @click="prepareEditedItem(item)"> mdi-pencil </v-icon>
						<v-icon size="20" color="error" @click="prepareDeletedItem(item)"> mdi-delete </v-icon>
					</template>
					<template v-slot:no-data>
						<v-btn color="primary" @click="getRoleList()"> Reset </v-btn>
					</template>
				</v-data-table>
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
		search: '',
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: '權限-角色名稱',
				align: 'start',
				sortable: false,
				value: 'name'
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
		},
		valid: true,
		name: '',
		nameRules: [(v) => !!v || '名稱為必填欄位', (v) => (v && v.length <= 16) || '名稱必須小於 16 個字元'],
		displayNameRules: [(v) => !!v || '顯示名稱為必填欄位', (v) => (v && v.length <= 16) || '顯示名稱必須小於 16 個字元']
	}),

	computed: {
		...mapGetters('roles', ['roleList']),
		...mapGetters(['allPermissions']),

		formTitle() {
			return this.editedIndex === -1 ? '新增權限-角色' : '編輯權限-角色';
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
		this.getRoleList();
	},

	methods: {
		...mapActions('roles', ['addRole', 'updateRole', 'deleteRole']),

		getRoleList() {
			this.$store.dispatch('roles/getRoles');
		},

		prepareEditedItem(item) {
			this.editedIndex = this.roleList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		prepareDeletedItem(item) {
			this.editedIndex = this.roleList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			if (this.editedIndex !== -1) {
				this.deleteRole(this.editedItem);
			}
			this.closeDelete();
			this.getRoleList();
		},

		editItemConfirm() {
			if (this.editedIndex === -1) {
				this.addRole(this.editedItem);
			} else {
				this.updateRole(this.editedItem);
			}
			this.close();
			this.getRoleList();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
				this.resetValidation();
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		// validate() {
		// 	if (this.$refs.form.validate()) {
		// 		return true;
		// 	} else {
		// 		return false;
		// 	}
		// },

		resetValidation() {
			this.$refs.form.resetValidation();
		}
	}
};
</script>
