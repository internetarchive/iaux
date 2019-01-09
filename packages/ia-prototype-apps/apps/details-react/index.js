import React from 'react';
import ReactDOM from 'react-dom';

// v2 mocks
// import MockHeader from 'ia-components/v2mocks/header'
import MockDetailsPageContainer from 'ia-components/sandbox/v2mocks/details-page-container'
import MockTheatreAudio from 'ia-components/sandbox/v2mocks/theatre-audio'
import MockReviews from 'ia-components/sandbox/v2mocks/reviews-empty'
import MockDescMeta from 'ia-components/sandbox/v2mocks/desc-meta'
import MockNav from 'ia-components/sandbox/v2mocks/nav'

// prototypes
import Audio1 from 'ia-components/sandbox/theatres/audio-1/audio-1'
import Audio1Br from 'ia-components/sandbox/theatres/audio-1/audio-1-br-nav-wav'
import TheatreSwitcher from 'ia-components/sandbox/theatres/theatre-switcher'

import RelatedAsList from 'ia-components/sandbox/related-as-list'
import SimpleDescMeta from 'ia-components/sandbox/simple-desc-meta'

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