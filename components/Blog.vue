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
                        <!-- <article style="border: black 1px" class="film_review">
                            <header>
                                <h2>Lorem Ipsum</h2>
                            </header>
                            <section>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            </section>
                            <footer>
                                <p>
                                Posted on
                                <time :datetime="now">{{ now }}</time>
                                </p>
                            </footer>
                        </article> -->
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
            // this.post = item.post;
        }
    },
    mounted() {
        this.$store.dispatch("accessResource", {
            method: "GET",
            route: "/api/blogposts/",
            callback: (result) => {
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
                console.log(this.items);
            }
        });
    }
}
</script>