import React from 'react';
import ReactDOM from 'react-dom';

// v2 mocks
// import MockHeader from 'ia-components/v2mocks/header'
import MockDetailsPageContainer from 'ia-components/live/v2mocks/details-page-container'
import MockTheatreAudio from 'ia-components/live/v2mocks/theatre-audio'
import MockReviews from 'ia-components/live/v2mocks/reviews-empty'
import MockDescMeta from 'ia-components/live/v2mocks/desc-meta'
import MockNav from 'ia-components/live/v2mocks/nav'

// prototypes
import TheatreSwitcher from 'ia-components/live/theatres/theatre-switcher'

import RelatedAsList from 'ia-components/live/related-as-list'
import SimpleDescMeta from 'ia-components/live/simple-desc-meta'

// other
import { getUrlParameter } from '../../lib/helpers/url'
import { Item } from 'ia-js-client'


let demoIdentifier = getUrlParameter('identifier') || "cd_point-of-departure_andrew-hill"
// demoIdentifier = 'cd_grass-roots_andrew-hill'


// CSS import (okay for prototype, but not for components, which are incluced in petabox)
// import './styles.less'

const item = new Item(demoIdentifier)


const App = () => (
  <div>
    <MockDetailsPageContainer
      item={item}
      navChild={<MockNav/>}
      theatreChild={<TheatreSwitcher item={item} />}
      reviewsChild={<MockReviews />}
      // descriptionChild={<MockDescMeta />}
      descriptionChild={<SimpleDescMeta item={item} />}
      relatedChild={<RelatedAsList identifier={demoIdentifier}/>}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));