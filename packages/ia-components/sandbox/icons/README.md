# HOW to use this Icon component<br>
import the package as `Icon` to your project 
```js
+ import Icon from 'path-to-the-package/icon'
```
| props         | description                | example                          | optional?|
| ------------- |:--------------------------:|---- |--------------------------: |
| name          | The particular icon to use| Internet archive,facebook,youtube|  false   |
| color         | give some color style      |     red,blue                     |  true    |
| size          | apply sizing to icon       |         29                       |  false   |
| type(WIP)     | the type of icon to use    |         Avatar                   |  true    | 

**If icon does not match up any icon from the dataset,the deafult is rendered to Internet Archive's icon**<br>
**when color is not passed,it defaults to the icon's color as defined in dataset**
