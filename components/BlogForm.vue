<template>
    <div>
        <v-text-field
            label="Article Name"
            v-model="name"
            outlined
        ></v-text-field>
        <v-card ref="stupidFuckingComponent" outlined>
            <v-card-text
                v-on:focus.stop
                v-on:click.stop
                id="scroll-target"
                style="max-height: 500px"
                class="overflow-y-auto"
            >
                <editor-content height="500px" class="editorOutline" ref="content" :autofocus="true" :editor="editor" />
            </v-card-text>
        </v-card>
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
            <v-toolbar>
                <v-btn v-for="(buttonData, i) in buttons" :key="i"
                    icon
                    class="menubar__button"
                    :class="buttonData.class(isActive)"
                    @click="buttonData.clickHandler(commands)"
                >
                    <v-icon>{{ buttonData.icon }}</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn @click="submitForm()">Submit</v-btn>
            </v-toolbar>
        </editor-menu-bar>
        <br>
    </div>
</template>

<script>
// import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
    Blockquote,
    CodeBlock,
    HardBreak,
    Heading,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    TodoItem,
    TodoList,
    Bold,
    Code,
    Italic,
    Link,
    Strike,
    Underline,
    History,
    Image,
} from 'tiptap-extensions'

export default {
    components: {
        EditorContent,
        EditorMenuBar,
    },
    data: () => ({
        name: "",
        buttons: [
            {
                class: (isActive) => {return{ 'is-active': isActive.bold()}},
                clickHandler: (commands) => {commands.bold()},
                icon: "mdi-format-bold",
            },{
                class: (isActive) => {return{ 'is-active': isActive.italic()}},
                clickHandler: (commands) => {commands.italic()},
                icon: "mdi-format-italic",
            },{
                class: (isActive) => {return{ 'is-active': isActive.strike()}},
                clickHandler: (commands) => {commands.strike()},
                icon: "mdi-format-strikethrough",
            },{
                class: (isActive) => {return{ 'is-active': isActive.underline()}},
                clickHandler: (commands) => {commands.underline()},
                icon: "mdi-format-underline",
            },{
                class: (isActive) => {return{ 'is-active': isActive.code()}},
                clickHandler: (commands) => {commands.code()},
                icon: "mdi-code-tags",
            },{
                class: (isActive) => {return{ 'is-active': isActive.paragraph()}},
                clickHandler: (commands) => {commands.paragraph()},
                icon: "mdi-format-paragraph",
            },{
                class: (isActive) => {return{ 'is-active': isActive.heading({ level: 1 })}},
                clickHandler: (commands) => {commands.heading({ level: 1 })},
                icon: "mdi-format-header-1",
            },{
                class: (isActive) => {return{ 'is-active': isActive.heading({ level: 2 })}},
                clickHandler: (commands) => {commands.heading({ level: 2 })},
                icon: "mdi-format-header-2",
            },{
                class: (isActive) => {return{ 'is-active': isActive.heading({ level: 3 })}},
                clickHandler: (commands) => {commands.heading({ level: 3 })},
                icon: "mdi-format-header-3",
            },{
                class: (isActive) => {return{ 'is-active': isActive.bullet_list()}},
                clickHandler: (commands) => {commands.bullet_list()},
                icon: "mdi-format-list-bulleted",
            },{
                class: (isActive) => {return{ 'is-active': isActive.ordered_list()}},
                clickHandler: (commands) => {commands.ordered_list()},
                icon: "mdi-format-list-numbered",
            },{
                class: (isActive) => {return{ 'is-active': isActive.blockquote()}},
                clickHandler: (commands) => {commands.blockquote()},
                icon: "mdi-format-quote-open",
            },{
                class: (isActive) => {return{ 'is-active': isActive.code_block()}},
                clickHandler: (commands) => {commands.code_block()},
                icon: "mdi-code-array",
            },{
                class: (isActive) => {return{isActive}},
                clickHandler: (commands) => {commands.horizontal_rule()},
                icon: "mdi-minus",
            },{
                class: (isActive) => {return{isActive}},
                clickHandler: (commands) => {commands.undo()},
                icon: "mdi-undo",
            },{
                class: (isActive) => {return{isActive}},
                clickHandler: (commands) => {commands.redo()},
                icon: "mdi-redo",
            },{
                class: (isActive) => {return{isActive}},
                clickHandler: (commands) => {
                    const src = prompt('Enter the url of your image here')
                    if (src !== null) {
                        commands.image({ src })
                    }
                },
                icon: "mdi-image",
            },
        ],
        editor: new Editor({
            onInit: ({ state, view }) => {
                state;
                var elem = view.docView.contentDOM;
                elem.style.height = "468px"
            },
            extensions: [
                new Blockquote(),
                new BulletList(),
                new CodeBlock(),
                new HardBreak(),
                new Heading({ levels: [1, 2, 3] }),
                new Image(),
                new HorizontalRule(),
                new ListItem(),
                new OrderedList(),
                new TodoItem(),
                new TodoList(),
                new Link(),
                new Bold(),
                new Code(),
                new Italic(),
                new Strike(),
                new Underline(),
                new History(),
            ],
            content: ``,
        }),
    }),
    methods: {
        submitForm() {
            this.$store.dispatch("accessResource", {
                method: "POST",
                route: "/api/blogposts",
                data: {
                    name: this.name,
                    body: this.editor.getHTML(),
                    date: new Date(),
                },
                callback: (result) => {
                    console.log("Result", result);
                }
            });
        },
    },
    beforeDestroy() {
        this.editor.destroy()
    },
}
</script>

<style>
    *:focus {
        outline: none;
    }

</style>