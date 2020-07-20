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
                        item-key="id"
                        dense
                        open-on-click
                        @update:active="openBlogPostFromID"
                    >
                        <template v-slot:prepend="{ item, open }">
                            <v-icon v-if="!item.post">
                                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                            </v-icon>
                        </template>
                        <template slot="label" slot-scope="{ item }" >
                            <div v-if="item.post">
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
        open: [],
        items: [],
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
                        if (item.id == ID) {
                            this.openBlogPost(item);
                            this.open.push(this.items[key].id);
                            this.open.push(this.items[key].children[key2].id);
                            return;
                        }
                    }
                }
            }
        },
    },
    mounted() {
        console.log(Date);
        this.$store.dispatch("accessResource", {
            method: "GET",
            route: "/api/blogposts/",
            callback: (result) => {
                // I take it back this is the shittiest code I've ever written
                let blogPosts = {};
                for (let i = 0; i < result.length; i++) {
                    let date = new Date(result[i].date);

                    // Get current year and if necessary add a branch for that year to the blog posts
                    let year = "" + date.getFullYear();
                    if (!blogPosts[year]) {
                        blogPosts[year] = {}
                    }

                    // Get the current month and if it doesn't exist yet, create a branch for that month
                    let month = date.toLocaleString('default', { month: 'long' });
                    if (!blogPosts[year][month]) {
                        blogPosts[year][month] = {};
                    }
                    // Attach the blogpost leaf to this branch
                    blogPosts[year][month][result[i].name] = {
                        _id: result[i]._id,
                        name: result[i].name,
                        post: result[i].body,
                        date: date
                    };
                }
                let items = [];
                let i = 0;

                // Add each year in sequence
                for (let year in blogPosts) {

                    // Create the next year node
                    items.push({id: i++, name: year, children: []});

                    // Store year node in var for readability
                    let yearNode = items[items.length - 1];

                    // Add each month to the current year
                    for (let month in blogPosts[year]) {

                        // Create the next month node
                        yearNode.children.push({id: i++, name: month, children: []});

                        // Store month node in var for readability
                        let monthNode = yearNode.children[yearNode.children.length -1];

                        // Add each post to the current month
                        for(let post in blogPosts[year][month]) {
                            let postNode = blogPosts[year][month][post];
                            monthNode.children.push({id: postNode._id, name: postNode.name, post: postNode.post});
                        }
                    }
                }
                this.items = items;
                this.openBlogPostFromID(this.$route.params.ID);
            }
        });
    }
}
</script>