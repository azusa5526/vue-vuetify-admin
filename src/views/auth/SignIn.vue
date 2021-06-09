<template>
	<v-container class="container--fluid fill-height primary">
		<v-row no-gutters align="center" justify="center">
			<v-col cols="12" sm="8" md="4" lg="4">
				<v-card class="elevation-5 pa-3">
					<v-card-text>
						<div class="layout column align-center">
							<img src="img/icons/android-icon-144x144.png" alt="Vue Vuetify Admin Logo" width="120" height="120" />
							<h1 class="text-center my-4 primary--text">Vue Vuetify Admin Template</h1>
						</div>
						<v-form>
							<v-text-field
								v-model="model.username"
								append-icon="mdi-account"
								name="email"
								:label="$t('login.account')"
								type="email"
								required
								autocomplete="username"
							/>
							<v-text-field
								v-model="model.password"
								append-icon="mdi-lock"
								name="password"
								:label="$t('login.password')"
								type="password"
								required
								autocomplete="current-password"
								@keyup.enter="login"
							/>
						</v-form>
					</v-card-text>
					<v-card-actions class="mt-6">
						<localization />
						<!-- <v-btn icon>
							<v-icon color="blue"> mdi-facebook </v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon color="red"> mdi-google </v-icon>
						</v-btn>
						<v-btn icon>
							<v-icon color="light-blue"> mdi-twitter </v-icon>
						</v-btn> -->
						<v-spacer />
						<v-btn color="primary" outlined to="/signup">
							{{ $t('login.signUp') }}
						</v-btn>
						<v-btn color="primary" :loading="loading" @click="login">
							{{ $t('login.signIn') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Localization from '../widget/AppLocalization.vue';

export default {
	name: 'SignIn',
	components: { Localization },
	data: () => ({
		loading: false,
		model: {
			username: 'admin',
			password: '123qwe'
		}
	}),
	methods: {
		async login() {
			this.loading = true;
			await this.$store
				.dispatch('user/Login', {
					username: this.model.username,
					password: this.model.password
				})
				.catch((error) => {
					console.error('SignIn.vue login error', error);
					this.loading = false;
				});
			this.loading = false;
			await this.$router.push(this.$route.query.redirect || '/');
		}
	}
};
</script>
