<template>
    <div class="table">
        <DataTable :value="products" tableStyle="min-width: 50rem">
            <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
        </DataTable>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [
                { code: 'A001', name: 'Product 1', category: 'Category 1', quantity: 10 },
                { code: 'A002', name: 'Product 2', category: 'Category 2', quantity: 20 },
            ],
            columns: null,
        };
    },
    created() {
        this.columns = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
            { field: 'category', header: 'Category' },
            { field: 'quantity', header: 'Quantity' }
        ];
    }
};
</script>

<style scoped>
    table{
        height: 260px;
    }
</style>
