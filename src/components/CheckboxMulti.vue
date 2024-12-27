<template>
    <label :for="item">{{label}}</label>
    <div class="checkbox-wrapper">
        <div class="checkbox-single" v-for="(opt, index) in opts">
            <Checkbox
                v-model="model[opt.value]"
                @update:modelValue="change"
                :inputId="`${item}-${opt.value}`"
                :name="item"
                :value="opt.value"
            />
            <label :for="`${item}-${index}`"> {{ opt.name }} </label>
        </div>
    </div>
</template>

<script lang="ts">
import { Checkbox } from 'primevue';

export default {
    name: "CheckboxMulti",
    props: ["item", "label", "opts", "checked"],
    emits: ["updated"],
    components: {
        Checkbox,
    },
    created() {
        this.opts.forEach((el) => {
            this.model[el.value] = false
        })
        console.log(this.model, this.checked)
        if (this.checked)
            this.checked.forEach(el => {
                this.model[el] = [el] 
            })
    },
    data: () => ({
        model: {}
    }),
    methods: {
        change() {
            this.$emit("updated", Object.keys(this.model).map(el => el).filter(el => this.model[el].length))
        }
    }
}
</script>