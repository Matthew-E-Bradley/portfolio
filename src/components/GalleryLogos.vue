<script setup>
import { ref, computed } from 'vue'
import GalleryImage from '../assets/record_fair_8.webp'
import recordFair from '../assets/record_fair_8.webp'
import imiLogo from '../assets/IMI logo.png'
import indieGrits from '../assets/indie grits.webp'

const viewMode = ref('grid') // 'grid' or 'detail'
const selectedProjectId = ref(1)

const projects = [
  {
    id: 1,
    title: 'Greater Columbia Record Fair',
    description: 'Creation, Organizing, Marketing, and Design of the Greater Columbia Record Fair for 10 years.',
    tags: ['Event Planning', 'Marketing', 'Graphic Design', 'Branding'],
    images: [
      {
        src: recordFair,
        alt: 'Greater Columbia Record Fair'
      }
      // Add more images here as you upload them
    ]
  },
  {
    id: 2,
    title: 'Logos',
    description: 'Hand-drawn and digitally designed logos for various clients.',
    tags: ['Illustration', 'Logo Design', 'Branding'],
    images: [
      {
        src: imiLogo,
        alt: 'IMI Logo'
      }
      // Add more images here as you upload them
    ]
  },
  {
    id: 3,
    title: 'Flyers and Posters',
    description: 'Hand-drawn and digitally designed flyers and posters for various clients.',
    tags: ['Design', 'Illustration', 'Typography'],
    images: [
      {
        src: indieGrits,
        alt: 'Indie Grits'
      }
      // Add more images here as you upload them
    ]
  }
]

const selectedProject = computed(() => {
  return projects.find(p => p.id === selectedProjectId.value)
})

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'detail' : 'grid'
}
</script>

<template>
  <main class="gallery-page">
    <header class="page-header">
      <h1>Gallery</h1>
      <p class="lead">Explore detailed views of my work across different projects.</p>
    </header>

    <div class="gallery-controls">
      <div class="view-switcher">
        <button
          :class="['view-btn', { active: viewMode === 'grid' }]"
          @click="viewMode = 'grid'"
          aria-label="Grid view"
        >
          Grid View
        </button>
        <button
          :class="['view-btn', { active: viewMode === 'detail' }]"
          @click="viewMode = 'detail'"
          aria-label="Detail view"
        >
          Detail View
        </button>
      </div>
    </div>

    <!-- Grid View -->
    <section v-if="viewMode === 'grid'" class="gallery-grid-view" aria-label="Gallery grid view">
      <div v-for="project in projects" :key="project.id" class="project-section">
        <h2>{{ project.title }}</h2>
        <p class="project-desc">{{ project.description }}</p>
        <div class="images-grid">
          <div
            v-for="(image, idx) in project.images"
            :key="idx"
            class="gallery-item"
            @click="selectedProjectId = project.id; viewMode = 'detail'"
          >
            <img :src="image.src" :alt="image.alt" />
          </div>
        </div>
      </div>
    </section>

    <!-- Detail View -->
    <section v-if="viewMode === 'detail'" class="gallery-detail-view" aria-label="Gallery detail view">
      <div v-if="selectedProject" class="detail-container">
        <div class="project-info">
          <h2>{{ selectedProject.title }}</h2>
          <p class="description">{{ selectedProject.description }}</p>
          <div class="tags">
            <span v-for="tag in selectedProject.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>

        <div class="images-carousel">
          <div class="carousel-images">
            <div v-for="(image, idx) in selectedProject.images" :key="idx" class="carousel-item">
              <img :src="image.src" :alt="image.alt" />
            </div>
          </div>
        </div>

        <div class="project-selector">
          <h3>View Other Projects</h3>
          <div class="project-buttons">
            <button
              v-for="project in projects"
              :key="project.id"
              :class="['project-btn', { active: selectedProjectId === project.id }]"
              @click="selectedProjectId = project.id"
            >
              {{ project.title }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.gallery-page {
  padding: calc(var(--section-gap) / 2);
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header .lead {
  color: var(--color-text-dim, #6b7280);
  font-size: 1.1rem;
}

/* View Switcher */
.gallery-controls {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.view-switcher {
  display: flex;
  gap: 0.5rem;
  background: var(--color-background-soft, #f3f4f6);
  padding: 0.5rem;
  border-radius: 8px;
}

.view-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  color: var(--color-text);
}

.view-btn.active {
  background: var(--color-background);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.view-btn:hover {
  background: var(--color-background);
}

/* Grid View */
.gallery-grid-view {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.project-section {
  display: flex;
  flex-direction: column;
}

.project-section h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.project-desc {
  color: var(--color-text-dim, #6b7280);
  margin-bottom: 1rem;
}

.images-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.gallery-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 1;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Detail View */
.gallery-detail-view {
  padding: 2rem 0;
}

.detail-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-info {
  text-align: center;
}

.project-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.description {
  color: var(--color-text-dim, #6b7280);
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto 1.5rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  background: var(--color-background-soft, #f3f4f6);
  color: var(--color-text);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid var(--color-border);
}

/* Carousel */
.images-carousel {
  display: flex;
  justify-content: center;
}

.carousel-images {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 100%;
}

.carousel-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 4 / 3;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Project Selector */
.project-selector {
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
  text-align: center;
}

.project-selector h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.project-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.project-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-border);
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-text);
  font-weight: 500;
}

.project-btn:hover {
  border-color: var(--color-text);
}

.project-btn.active {
  background: var(--color-text);
  color: var(--color-background);
  border-color: var(--color-text);
}

@media (min-width: 768px) {
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .carousel-images {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

@media (min-width: 1024px) {
  .page-header h1 {
    font-size: 3rem;
  }

  .project-info h2 {
    font-size: 2.5rem;
  }
}
</style>
