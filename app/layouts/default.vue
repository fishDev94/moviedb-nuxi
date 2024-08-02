<template>
    <div>
        <app-nav-bar />
        <main class="page-slot">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" scoped>
    .page-slot {
        margin-top: var(--nav-bar-height-mobile);
        padding: 16px 20px;
    }
</style>