<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  id: [String, Number],
  title: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  image: { type: String, default: null },
  link: { type: String, default: null }
})

const viewGallery = () => {
  const galleryMap = {
    1: 'gallery-record-fair',
    2: 'gallery-logos',
    3: 'gallery-posters'
  }
  const routeName = galleryMap[props.id]
  if (routeName) {
    router.push({ name: routeName })
  }
}
</script>

<template>
  <article class="project-card">
    <div class="media" v-if="image">
      <img :src="image" :alt="title" />
    </div>

    <div class="content">
      <h3>{{ title }}</h3>
      <p class="desc">{{ description }}</p>
      <ul class="tags">
        <li v-for="(t, i) in tags" :key="i">{{ t }}</li>
      </ul>

      <div class="actions">
        <button v-if="id" @click="viewGallery" class="view-btn">View</button>
        <a v-else-if="link" :href="link" target="_blank" rel="noopener">View</a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  background: var(--color-background);
  border-radius: 8px;
  overflow: hidden;
  transition: transform .12s ease, box-shadow .12s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
}

.media img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  display: block;
}

.content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

h3 {
  margin: 0;
  font-size: 1.05rem;
  color: var(--color-heading);
}

.desc {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text);
}

.tags {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tags li {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(0,0,0,0.04);
}

.actions {
  margin-top: 0.5rem;
}

.actions a,
.view-btn {
  font-weight: 600;
  color: var(--color-text);
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
}

.actions a:hover,
.view-btn:hover {
  opacity: 0.7;
}
</style>