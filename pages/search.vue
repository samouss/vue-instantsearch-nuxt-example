<template>
  <ais-instant-search-ssr>
    <ais-search-box />
    <ais-stats />
    <ais-refinement-list attribute="brand" />
    <ais-hits>
      <template slot="item" slot-scope="{ item }">
        <p>
          <ais-highlight attribute="name" :hit="item" />
        </p>
        <p>
          <ais-highlight attribute="brand" :hit="item" />
        </p>
      </template>
    </ais-hits>
    <ais-pagination />
  </ais-instant-search-ssr>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
} from 'vue-instantsearch';

export default {
  provide() {
    return {
      // It was provided by the `rootMixin` but it's not possible to have access
      // to it anymore. That's why we have to provide it manually. The plugin
      // is in charge of exposing `$instantsearch` on the App instance.
      // eslint-disable-next-line camelcase
      $_ais: this.$instantsearch,
    };
  },
  asyncData(context) {
    // We are now able to access the instance through the context
    const $instantsearch = context.app.$instantsearch;

    return $instantsearch
      .findResultsState({
        query: 'iphone',
        hitsPerPage: 5,
        disjunctiveFacets: ['brand'],
        disjunctiveFacetsRefinements: { brand: ['Apple'] },
      })
      .then(() => ({
        algoliaState: $instantsearch.getState(),
      }));
  },
  beforeMount() {
    this.$instantsearch.hydrate(this.algoliaState);
  },
  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://unpkg.com/instantsearch.css@7.1.0/themes/algolia-min.css',
        },
      ],
    };
  },
};
</script>

<style>
.ais-Hits-list {
  text-align: left;
}
.ais-InstantSearch {
  margin: 1em;
}
</style>
