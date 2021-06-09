<template>
	<div class="message-alert">
		<v-alert v-for="(item, i) in messages" :key="i" border="left" dismissible :type="status" transition="scale-transition">
			{{ item.message }}
			<!-- <template v-slot:close>
				<v-btn icon small>
					<v-icon>mdi mdi-close-circle</v-icon>
				</v-btn>
			</template> -->
		</v-alert>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AlertMessage',
	data() {
		return {
			messages: []
		};
	},
	methods: {
		updateMessage(message, status) {
			const timestamp = Math.floor(new Date() / 1000);
			this.messages.push({
				message,
				status,
				timestamp
			});
			this.removeMessageWithTiming(timestamp);
		},
		removeMessage(num) {
			this.messages.splice(num, 1);
		},
		removeMessageWithTiming(timestamp) {
			const vm = this;
			setTimeout(() => {
				vm.messages.forEach((item, i) => {
					if (item.timestamp === timestamp) {
						vm.messages.splice(i, 1);
					}
				});
			}, 4000);
		}
	},

	watch: {
		isNotice: function () {
			this.updateMessage(this.message, this.status);
		}
	},

	computed: {
		...mapGetters('alert', ['message', 'status', 'isNotice'])
	}
};
</script>

<style scope>
.message-alert {
	position: fixed;
	max-width: 50%;
	min-width: 320px;
	bottom: 15px;
	right: 20px;
	z-index: 1100;
}

.alert {
	border-radius: 0;
}
</style>
