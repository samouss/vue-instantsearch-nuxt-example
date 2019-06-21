import algoliasearch from 'algoliasearch/lite';
import { createInstantSearch } from 'vue-instantsearch';

export default function VueInstantSearchPlugin(_, inject) {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );

  const { instantsearch } = createInstantSearch({
    indexName: 'instant_search',
    searchClient,
  });

  inject('instantsearch', instantsearch);
}
