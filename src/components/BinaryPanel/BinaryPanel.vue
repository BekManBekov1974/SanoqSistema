<template>
    <div class="container-fluid mt-4">
        <div>
            <div
                class="part"
                @mousedown="changeBit(item.id, item.val)"
                :ref="'bit' + item.id"
                v-for="item in line.slice(0, 32)"
                :key="item.id"
                :class="{
                    seperated: (item.id + 1) % 4 == 0,
                    margin: (item.id + 1) % 16 === 0,
                    highlightBit: item.id >= minPosition,
                }"
            >
                <span :class="{ zero: item.val == 1 }">0</span>
                <span class="first" :class="{ one: item.val == 1 }">1</span>
            </div>
        </div>
        <div class="conta mt-5">
            <div
                class="part"
                @click="changeBit(item.id, item.val)"
                :ref="'bit' + item.id"
                v-for="item in line.slice(32, 64)"
                :key="item.id"
                :class="{
                    seperated: (item.id + 1) % 4 == 0,
                    margin: (item.id + 1) % 16 === 0,
                    highlightBit: item.id >= minPosition,
                }"
            >
                <span :class="{ zero: item.val == 1 }">0</span>
                <span class="first" :class="{ one: item.val == 1 }">1</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    emits: ['onChangeBits'],
    props: {
        bits: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            line: [...Array(64).keys()].map((e, i) => {
                return {
                    val: 0,
                    id: i,
                    checked: false,
                }
            }),
            minId: {},
        }
    },
    computed: {
        getAllBits() {
            return [...Object.values(this.line)]
                .filter(e => e.id >= this.minPosition)
                .map(e => e.val)
                .join('')
        },
        minPosition() {
            return Math.min(...Object.keys(this.minId))
        },
    },
    methods: {
        changeBit(id, bit) {
            this.addPosition(id)
            this.line[id].val = bit === 0 ? 1 : 0
            this.$nextTick(() => {
                this.$emit('onChangeBits', this.getAllBits)
            })
        },
        addPosition(id) {
            if (this.minId[id] === undefined) {
                this.minId = {
                    ...this.minId,
                    [id]: id,
                }
            } else {
                delete this.minId[id]
            }
        },
    },
    watch: {
        bits: function (val) {
            if (val) {
                let pos = val.length - 1
                this.minId = { [63 - pos]: 63 - pos }
                this.line.forEach((e, ind) => {
                    this.line[63 - ind].val = this.bits[pos - ind] || 0
                })
            }
        },
    },
}
</script>
<style lang="sass" scoped src="./BinaryPanel.sass"></style>
