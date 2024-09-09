
let slider = document.querySelectorAll('.slider');

for (let index = 0; index < slider.length; index++) {
   if (slider[index].dataset.Gap == '' || slider[index].dataset.Type == '' || slider[index].dataset.Slides == '') {
      slider[index].classList.add('_remove');
   } else {
      slider[index].classList.remove('_remove');

      const SliderDisplay = slider[index].querySelector('.slider__display');
      let sliderWidth = SliderDisplay.clientWidth;

      const GapSlides = slider[index].dataset.Gap;
      const Slides = slider[index].dataset.Slides;
      const Type = slider[index].dataset.Type;

      let sliderItems = slider[index].getElementsByClassName('slider__item');
      let slidetItemsWidth = (sliderWidth - (Slides - 1) * GapSlides) / Slides;

      let itemHeight = 0;

      for (let index = 0; index < sliderItems.length; index++) {
         sliderItems[index].style['min-width'] = slidetItemsWidth + 'px';
         sliderItems[index].style['min-height'] = '400px';
         sliderItems[index].style['margin-right'] = GapSlides + 'px';

         if (sliderItems[index].clientHeight > itemHeight) {
            itemHeight = sliderItems[index].clientHeight;
         }
      }

      /*------------------------------------------------------------------------*/

      let SliderDisplaySyles = {
         'width': '100%',
         'display': 'grid',
         'grid-template-columns': `repeat(${sliderItems.length}, 1fr)`,
         'grid-template-rows': '1fr',
         'overflow': 'scroll',
         'scroll-behavior': 'smooth',
         'min-height': '400px',
         'padding-top': '40px',
         'padding-bottom': '40px',
      }

      for (css in SliderDisplaySyles) {
         SliderDisplay.style[css] = SliderDisplaySyles[css];
      }

      /*------------------------------------------------------------------------*/


      sliderItems[sliderItems.length - 1].style['margin-right'] = (GapSlides / 2) + 'px';

      let emptyItemStyles = {
         'display': 'flex',
         'align-items': 'center',
         'justify-content': 'center',
         'background': 'darkgrey',
         'padding': '5px',
      }
      for (let index = 0; index < sliderItems.length; index++) {
         if (sliderItems[index].innerHTML == '') {
            sliderItems[index].classList.add('_empty');
            sliderItems[index].innerText = 'item';
         } else {
            sliderItems[index].classList.remove('_empty');
         };
      }
      let emptyItemCollection = slider[index].querySelectorAll('._empty');
      emptyItemCollection.forEach(item => {
         for (css in emptyItemStyles) {
            item.style[css] = emptyItemStyles[css];
         }
      });

      let currentItem = 0;
      let numberOfSlides = Math.ceil(sliderItems.length / Slides);

      /*====== functions ==================================================================*/

      function line(index, numberOfSlides, currentItem, SliderDisplay, sliderWidth, GapSlides) {

         var line = document.createElement('div');
         line.classList.add('line');

         slider[index].append(line);

         let lineDisplay = document.createElement('div');
         lineDisplay.classList.add('line__display');

         line.append(lineDisplay);

         var lineIndex = document.createElement('div');
         lineIndex.classList.add('line__index');

         lineDisplay.append(lineIndex);

         let lineStyles = {
            'width': '100%',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'margin': '0 0 50px 0',
         }
         for (css in lineStyles) {
            line.style[css] = lineStyles[css];
         }

         let lineDisplayStyles = {
            'width': '60%',
            'height': '6px',
            'border-radius': '60px',
            'background': 'white',
            'position': 'relative',
            'overflow': 'hidden',
         }
         for (css in lineDisplayStyles) {
            lineDisplay.style[css] = lineDisplayStyles[css];
         }

         let lineIndexStyles = {
            'position': 'absolute',
            'height': '100%',
            'top': '0',
            'background': 'black',
            'transition': 'all 0.3s ease',
         }
         for (css in lineIndexStyles) {
            lineIndex.style[css] = lineIndexStyles[css];
         }

         var lineDisplayWidth = lineDisplay.clientWidth;
         var lineIndexWidth = lineDisplayWidth / numberOfSlides;
         line.dataset.Status = true;

         lineIndex.style['width'] = lineIndexWidth + 'px';

         line.addEventListener("click", (event) => {
            let target = event.target.closest('.line__display');
            let targetIndex = Math.floor(event.layerX / lineIndexWidth);

            if (event.target.closest('.line__index')) { } else if (target) {
               if (targetIndex > currentItem) {
                  SliderDisplay.scrollBy(((sliderWidth + (+GapSlides)) * (targetIndex - currentItem)), 0);
               } else if (targetIndex < currentItem) {
                  SliderDisplay.scrollBy((-sliderWidth - (+GapSlides)) * (currentItem - targetIndex), 0);
               }
               currentItem = targetIndex;
            };
         });

         lineIndex.style['left'] = (currentItem * lineIndexWidth) + 'px';
      }

      function getLine(currentItem, index, numberOfSlides) {
         let lineIndex = slider[index].querySelector('.line__index');
         let lineDisplay = slider[index].querySelector('.line__display');
         let lineDisplayWidth = lineDisplay.clientWidth;
         let lineIndexWidth = lineDisplayWidth / numberOfSlides;
         lineIndex.style['left'] = (currentItem * lineIndexWidth) + 'px';
      }

      function dots(index, currentItem, numberOfSlides, SliderDisplay, sliderWidth, GapSlides) {
         let dotsDisplayStyles = {
            'width': '100%',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'gap': '5px',
            'z-index': '5',
         }
         let dotsStyles = {
            'width': '10px',
            'height': '10px',
            'border-radius': '50%',
            'background': 'black',
         }
         let dotsDisplay = document.createElement('div');
         dotsDisplay.classList.add('dots__display');


         for (css in dotsDisplayStyles) {
            dotsDisplay.style[css] = dotsDisplayStyles[css];
         }
         for (let index = 0; index < numberOfSlides; index++) {
            let dot = document.createElement('div');
            dot.classList.add('dot');
            for (css in dotsStyles) {
               dot.style[css] = dotsStyles[css];
            }
            dotsDisplay.append(dot);
         }
         slider[index].append(dotsDisplay);
         let dotsItems = slider[index].querySelectorAll('.dot');

         for (let index = 0; index < dotsItems.length; index++) {
            dotsItems[index].dataset.Number = index;
         }
         /*------------------------------------------------------------------------*/

         dotsDisplay.addEventListener("click", (event) => {

            let target = event.target.closest('.dot');
            let targetIndex;
            if (event.target.closest('.dot')) {
               targetIndex = target.dataset.Number;
               if (targetIndex >= currentItem) {
                  SliderDisplay.scrollBy(((sliderWidth + (+GapSlides)) * (targetIndex - currentItem)) + (SliderDisplay.scrollLeft - (sliderWidth + +GapSlides) * currentItem), 0);
               } else if (targetIndex < currentItem) {
                  SliderDisplay.scrollBy((-sliderWidth - (+GapSlides)) * (currentItem - targetIndex) - (SliderDisplay.scrollLeft - (sliderWidth + +GapSlides) * currentItem), 0);
               }
            };
            currentItem = targetIndex;
            getDots(index, currentItem, slider);
            console.log('current item dots ' + currentItem);
         });

         return dotsItems;
      }

      function getDots(index, currentItem, slider) {
         let currentDots = slider[index].getElementsByClassName('dot');
         currentDots[currentItem].style['background'] = 'lightblue';
         for (let index = 0; index < currentDots.length; index++) {
            if (index != currentItem) {
               currentDots[index].style['background'] = 'black';
            } else { }
         }
      }

      /*====== events ===============================================================*/

      let eventScroll;
      let scrollDelay = 200;

      SliderDisplay.addEventListener('scroll', (event) => {

         if (SliderDisplay.scrollLeft - sliderWidth - (+GapSlides) > currentItem) {
            currentItem = Math.round(SliderDisplay.scrollLeft / sliderWidth);
         } else if (SliderDisplay.scrollLeft - sliderWidth - (+GapSlides) < currentItem) {
            currentItem = Math.round(SliderDisplay.scrollLeft / sliderWidth);
         }
         /*clearTimeout(eventScroll);

         eventScroll = setTimeout(() => {
            let scrollGap = SliderDisplay.scrollLeft - (currentItem * (sliderWidth + +GapSlides));

            console.log('scroll gap ' + scrollGap);
            console.log('slider width ' + sliderWidth);
            console.log('slider left ' + SliderDisplay.scrollLeft);

            if (scrollGap != 0) {
               if (scrollGap <= sliderWidth / 2) {
                  //SliderDisplay.scrollBy(-scrollGap, 0);
                  SliderDisplay.scrollBy(-scrollGap + (+GapSlides), 0);
                  currentItem--;
               } else if (scrollGap > sliderWidth / 2) {
                  //SliderDisplay.scrollBy(scrollGap, 0);
                  SliderDisplay.scrollBy(-scrollGap + (+GapSlides), 0);
                  currentItem++;
               }
            }
         }, scrollDelay);
         console.log('current item scrol ' + currentItem);*/

         if (Type == 'line') {
            getLine(currentItem, index, numberOfSlides);
         }
         if (Type == 'dots') {
            getDots(index, currentItem, slider);
         }
      });

      /*------------------------------------------------------------------------*/
       
      slider[index].addEventListener("click", (event) => {
         let target = event.target.closest('.button');
         if (target) {
            if (target.classList.contains('button--left')) {
               SliderDisplay.scrollBy(-sliderWidth - GapSlides, 0);
               if (currentItem != 0) {
                  currentItem--;
               } else {
               }
            }
            if (target.classList.contains('button--right')) {
               SliderDisplay.scrollBy((sliderWidth + (+GapSlides)), 0);
               if (currentItem != (Math.ceil(sliderItems.length / Slides) - 1)) {
                  currentItem++;
               } else {
               }
            }
         }
         if (Type == 'line') {
            getLine(currentItem, index, numberOfSlides);
         } else if (Type == 'dots') {
            getDots(index, currentItem, slider);
         }

      });

      /*------------------------------------------------------------------------*/
       
      slider[index].addEventListener("mouseover", (event) => {
         let target = event.target.closest('.button');
         if (!target) return;
         target.style['background-color'] = 'rgba(77, 77, 77, 0.785)';
      });
      slider[index].addEventListener("mouseout", (event) => {
         let target = event.target.closest('.button');
         if (!target) return;
         target.style['background'] = 'darkgray';
      });

      /*==== list of types ================================================================*/

      if (Type == 'line') {
         line(index, numberOfSlides, currentItem, SliderDisplay, sliderWidth, GapSlides);
      } else if (Type == 'dots') {
         dots(index, currentItem, numberOfSlides, SliderDisplay, sliderWidth, GapSlides);
         getDots(index, currentItem, slider);
      }

      /*==== buttons arrow ===================================================================*/


      slider[index].style['position'] = 'relative';

      let buttonStyles = {
         'position': 'absolute',
         'top': '50%',
         'transform': 'translateY(-50%)',
         'width': '50px',
         'height': '50px',
         'border-radius': '50%',
         'background-color': 'darkgray',
         'display': 'flex',
         'align-items': 'center',
         'justify-content': 'center',
         'transition': 'all 0.4s ease',
      }
      let buttonDisplay = {
         'width': '100%',
         'height': '100%',
         'top': 0,
         'left': 0,
         'position': 'relative',
      }
      let buttonArrowsStyles = {
         'position': 'absolute',
         'top': '50%',
         'transform': 'translateY(-50%) rotate(45deg)',
         'width': '30%',
         'height': '30%',
         'box-sizing': 'border-box',
      }
      let buttonLeft = document.createElement('div');
      buttonLeft.classList.add('button', 'button--left');

      let buttonRight = document.createElement('div');
      buttonRight.classList.add('button', 'button--right');

      for (css in buttonStyles) {
         buttonLeft.style[css] = buttonStyles[css];
         buttonRight.style[css] = buttonStyles[css];
      }
      buttonLeft.style['left'] = '5px';
      buttonRight.style['right'] = '5px';

      slider[index].prepend(buttonLeft);
      slider[index].prepend(buttonRight);

      let buttonDisplayLeft = document.createElement('div');
      buttonDisplayLeft.classList.add('button__display-left');

      let buttonDisplayRight = document.createElement('div');
      buttonDisplayRight.classList.add('button__display-right');

      for (css in buttonDisplay) {
         buttonDisplayLeft.style[css] = buttonDisplay[css];
         buttonDisplayRight.style[css] = buttonDisplay[css];
      }

      buttonLeft.prepend(buttonDisplayLeft);
      buttonRight.prepend(buttonDisplayRight);

      let buttonArrowLeft = document.createElement('div');
      buttonArrowLeft.classList.add('button__arrow-left');

      let buttonArrowRight = document.createElement('div');
      buttonArrowRight.classList.add('button__arrow-right');

      for (css in buttonArrowsStyles) {
         buttonArrowLeft.style[css] = buttonArrowsStyles[css];
         buttonArrowRight.style[css] = buttonArrowsStyles[css];
      }

      buttonArrowLeft.style['border-left'] = '3px solid black';
      buttonArrowLeft.style['border-bottom'] = '3px solid black';
      buttonArrowLeft.style['left'] = 'calc(55% - 8px)';

      buttonArrowRight.style['border-right'] = '3px solid black';
      buttonArrowRight.style['border-top'] = '3px solid black';
      buttonArrowRight.style['right'] = 'calc(55% - 8px)';

      buttonDisplayLeft.prepend(buttonArrowLeft);
      buttonDisplayRight.prepend(buttonArrowRight);


   }
}
