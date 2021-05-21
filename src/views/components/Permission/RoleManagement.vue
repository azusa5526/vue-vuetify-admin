<template>
	<app-center>
		<template v-slot:page>
			<v-col class="text-h1"> RoleManagement </v-col>
		</template>
	</app-center>
</template>

<script>
import AppCenter from '@/views/widget/AppCenter.vue';

export default {
	name: 'RoleManagement',
	components: {
		AppCenter
	}
};
</script>

<style scoped></style>
