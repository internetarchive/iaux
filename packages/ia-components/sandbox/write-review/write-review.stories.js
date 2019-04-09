import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';

import WriteReviewComponent from './write-review';
import style from './write-review.less';


  storiesOf('Sandbox', module)
  // .addParameters({ jest: ['example.test.js'] })
  .addWithJSX('Write Review Component', () => {
    const bookname=text('Book Name',"How Reach People Think")
    return <WriteReviewComponent bookName={bookname}/>
  })
