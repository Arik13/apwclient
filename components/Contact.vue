<template>
    <div>
        <h1>Contact</h1>
        <v-form>
            <v-text-field
                outlined
                label="Subject"
                v-model="subject"
            />
            <v-textarea
                outlined
                label="Body"
                v-model="message"
            />
            <v-btn @click="sendEmail()">
                Send
            </v-btn>
        </v-form>
        <br>
        <v-alert
            v-if="show"
            :type="alertType"
        >
            Message sent!
        </v-alert>
    </div>
</template>

<script>
export default {
    data: () => ({
        subject: "",
        message: "",
        show: false,
        alertType: ""
    }),
    methods: {
        sendEmail() {
            this.$store.dispatch("accessResource", {
                method: "POST",
                route: "/api/send-email/",
                data: {
                    subject: this.subject,
                    message: this.message
                },
                callback: (result) => {
                    if (result.success) {
                        this.subject = "";
                        this.message = "";
                        this.alertType = "success";
                    }
                    else {
                        this.alertType = "error"
                    }
                    this.show = true;
                    setTimeout(() => {
                        this.show = false;
                        this.alertType = ""
                    }, 3000)
                }
            });
        },
    }
}
</script>