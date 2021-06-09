<template>
	<v-app>
		<AlertMessage></AlertMessage>
		<router-view />
	</v-app>
</template>

<script>
import AlertMessage from '@/views/widget/AlertMessage.vue';

export default {
	components: {
		AlertMessage
	},
	name: 'App'
};
</script>
