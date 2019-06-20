<template>
  <div id="editor">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :option="editorOption"
      @blur="onEditorBlur($event)"
      @focus.native.prevent="onEditorFocus($event)"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
// import quillConfig from "./../../util/quill-config.js";
import bus from "./bus.js";
const toolbarOptions = [["bold"], ["image"]];
export default {
  data() {
    return {
      content: "请输入内容",
      editorOption: {
        modules: {
          toolbar: toolbarOptions
        }
      }
    };
  },
  created() {
    // console.log(this.editorOption);
  },
  methods: {
    // 编辑器准备完毕
    onEditorReady(quill) {
      // console.log("editor ready!", quill);
          // console.log(this._props.answerContent)
    // this.content = this._props.answerContent
    this.content = '请输入内容'
    },
    // 失去焦点
    onEditorBlur(quill) {
      // console.log("editor blur!", quill);
      // console.log(quill.container.firstChild.innerHTML);
    },
    // 获取焦点
    onEditorFocus(quill) {
      // console.log("editor focus!", quill);
    },
    // 内容改变
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      let str = text + "";
      console.log(str);
      console.log(str.length);
      this.content = html;
      bus.$emit("editor", this.content);
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    // console.log("this is current quill instance object", this.editor);
    console.log(this.editor.options.placeholder);
    this.editor.options.placeholder = "请输入内容";
    this.$set(this.editor.options, "placeholder", "请输入内容");
    this.editor.options.modules.toolbar.container[13] = ["link", "image"];
  },
  components: {
    quillEditor
  }
};
</script>

<style lang="stylus" scoped>
// 引入富文本编辑器样式
require('quill/dist/quill.core.css');
require('quill/dist/quill.snow.css');
require('quill/dist/quill.bubble.css');

#editor >>> .ql-toolbar {
  text-align: left;
}

#editor >>> .ql-container {
  height: 300px;
}
</style>
