<template>
    <div>
        <v-row height="100%">
            <v-col
                :cols="12"
                :lg="8"
                :md="8"
                :sm="12"
                :xs="12"
            >
                <v-card outlined>
                    <v-card-text>
                        <div v-html="post"></div>
                    </v-card-text>
                </v-card>

            </v-col>
            <v-col
                :cols="23"
                :lg="4"
                :md="4"
                :sm="12"
                :xs="12"
            >
                <v-card outlined>
                    <v-treeview
                        :open="open"
                        :items="items"
                        hoverable
                        activatable
                        open-on-click
                        item-key="name"
                    >
                        <template v-slot:prepend="{ item, open }">
                            <v-icon v-if="!item.post">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                            </v-icon>
                        </template>
                        <template slot="label" slot-scope="{ item }">
                            <div v-if="item.post" @click="openBlogPost(item)">
                                {{ item.name }}
                            </div>
                            <div v-else >
                                {{ item.name }}
                            </div>
                        </template>
                    </v-treeview>
                    <v-card-text>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>


    </div>
</template>

<script>
export default {
    data: () => ({
        post: "",
        open: ["2020", "4"],
        items: []
    }),
    methods: {
        openBlogPost(item) {
            this.post = item.post;
        },
        openBlogPostFromID(ID) {
            // This is the shittiest code I've ever written
            for (var key in this.items) {
                for (var key2 in this.items[key].children) {
                    for (var key3 in this.items[key].children[key2].children) {
                        var item = this.items[key].children[key2].children[key3];
                        if (item._id == ID) {
                            this.openBlogPost(item);
                            this.open.push(item.id);
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.$store.dispatch("accessResource", {
            method: "GET",
            route: "/api/blogposts/",
            callback: (result) => {
                // This is the second most shittiest code I've ever written
                let blogPosts = {};
                for (let i = 0; i < result.length; i++) {
                    let date = new Date(result[i].date);
                    let year = "" + date.getFullYear();
                    if (!blogPosts[year]) {
                        blogPosts[year] = {}
                    }
                    let month = "" + date.getMonth();
                    if (!blogPosts[year][month]) {
                        blogPosts[year][month] = {};
                    }
                    blogPosts[year][month][result[i].name] = {_id: result[i]._id, name: result[i].name, post: result[i].body, date: date};
                }
                let items = [];
                let i = 0;
                for (let year in blogPosts) {
                    items.push({id: i++, name: year, children: []});
                    let yearNode = items[items.length - 1];
                    for (let month in blogPosts[year]) {
                        yearNode.children.push({id: i++, name: month, children: []});
                        let monthNode = yearNode.children[yearNode.children.length -1]
                        for(let post in blogPosts[year][month]) {
                            let postNode = blogPosts[year][month][post];
                            monthNode.children.push({_id: postNode._id, id: i++, name: postNode.name, post: postNode.post});
                        }
                    }
                }
                this.items = items;
                this.open.push(this.$route.params);
                this.openBlogPostFromID(this.$route.params.ID);
            }
        });
    }
}
</script>