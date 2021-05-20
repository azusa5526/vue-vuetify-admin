<template>
	<AppTopCenter>
		<template v-slot:page>
			<v-col class="text-h1"> PermissionManagement </v-col>
		</template>
	</AppTopCenter>
</template>

<script>
import AppTopCenter from '@/views/widget/AppCenter.vue';

export default {
	name: 'Editor',
	components: {
		AppTopCenter
	}
};
</script>

<style scoped></style>
