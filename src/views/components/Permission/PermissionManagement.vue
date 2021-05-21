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
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
						></v-text-field>
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
											<v-btn color="blue darken-1" text @click="validate()"> 儲存 </v-btn>
										</v-card-actions>
									</v-card>
								</v-form>
							</v-dialog>
							<v-dialog v-model="dialogDelete" max-width="550px">
								<v-card>
									<v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
										<v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
										<v-spacer></v-spacer>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</v-toolbar>
					</template>
					<template v-slot:[`item.actions`]="{ item }">
						<v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
						<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
import { mapGetters } from 'vuex';

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
			grantedPermissions: ''
		},
		defaultItem: {
			name: '',
			displayName: '',
			description: '',
			grantedPermissions: ''
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
		},

		validate() {
			// this.$refs.form.validate();
			this.$refs.form[0].validate();
		}
	},

	created() {
		// this.initialize();
		this.getRoleList();
	},

	methods: {
		getRoleList() {
			this.$store.dispatch('roles/getRoles');
		},

		// initialize() {
		// 	this.desserts = [
		// 		{
		// 			name: 'Frozen Yogurt',
		// 			calories: 159,
		// 			fat: 6.0,
		// 			carbs: 24,
		// 			protein: 4.0
		// 		},
		// 		{
		// 			name: 'Ice cream sandwich',
		// 			calories: 237,
		// 			fat: 9.0,
		// 			carbs: 37,
		// 			protein: 4.3
		// 		},
		// 		{
		// 			name: 'Eclair',
		// 			calories: 262,
		// 			fat: 16.0,
		// 			carbs: 23,
		// 			protein: 6.0
		// 		},
		// 		{
		// 			name: 'Cupcake',
		// 			calories: 305,
		// 			fat: 3.7,
		// 			carbs: 67,
		// 			protein: 4.3
		// 		},
		// 		{
		// 			name: 'Gingerbread',
		// 			calories: 356,
		// 			fat: 16.0,
		// 			carbs: 49,
		// 			protein: 3.9
		// 		},
		// 		{
		// 			name: 'Jelly bean',
		// 			calories: 375,
		// 			fat: 0.0,
		// 			carbs: 94,
		// 			protein: 0.0
		// 		},
		// 		{
		// 			name: 'Lollipop',
		// 			calories: 392,
		// 			fat: 0.2,
		// 			carbs: 98,
		// 			protein: 0
		// 		},
		// 		{
		// 			name: 'Honeycomb',
		// 			calories: 408,
		// 			fat: 3.2,
		// 			carbs: 87,
		// 			protein: 6.5
		// 		},
		// 		{
		// 			name: 'Donut',
		// 			calories: 452,
		// 			fat: 25.0,
		// 			carbs: 51,
		// 			protein: 4.9
		// 		},
		// 		{
		// 			name: 'KitKat',
		// 			calories: 518,
		// 			fat: 26.0,
		// 			carbs: 65,
		// 			protein: 7
		// 		}
		// 	];
		// },

		editItem(item) {
			this.editedIndex = this.roleList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.roleList.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.roleList.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
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

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.roleList[this.editedIndex], this.editedItem);
			} else {
				this.roleList.push(this.editedItem);
			}
			this.close();
		}
	}
};
</script>
