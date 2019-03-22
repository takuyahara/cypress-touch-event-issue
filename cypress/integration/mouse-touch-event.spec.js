it(`Mouse Event`, () => {
  cy.viewport(640, 480);
  cy.visit(`http://localhost:3000/`);

  // EXPECTED
  //   clientX/Y and pageX/Y have passed and app works.
  //   Red point appears at same position.
  cy.get(`body`)
    .trigger(`mousedown`, 200, 50)
    .trigger(`mousemove`, 440, 50)
    .trigger(`mouseup`, 440, 50);
});

it(`Touch Event`, () => {
  cy.viewport(640, 480);
  cy.visit(`http://localhost:3000/`);

  // UNEXPECTED
  //   changedTouches[] is not passed and app causes error.
  cy.get(`body`)
    .trigger(`touchstart`, 200, 50)
    .trigger(`touchmove`, 440, 50)
    .trigger(`touchend`, 440, 50);

  // UNEXPECTED
  //   changedTouches[] is passed and app works.
  //   But clientX/Y and pageX/Y indicate page's center and red point appears there.
  cy.get(`body`)
    .trigger(`touchstart`, {
      changedTouches: [
        {
          clientX: 200,
          clientY: 50,
        },
      ],
    })
    .trigger(`touchmove`, {
      changedTouches: [
        {
          clientX: 440,
          clientY: 50,
        },
      ],
    })
    .trigger(`touchend`, {
      changedTouches: [
        {
          clientX: 440,
          clientY: 50,
        },
      ],
    });

  // EXPECTED
  //   changedTouches[] is passed and app works.
  //   Red point appears at same position.
  //   But coords have to be specified twice and it's redundant.
  cy.get(`body`)
    .trigger(`touchstart`, 200, 50, {
      changedTouches: [
        {
          clientX: 200,
          clientY: 50,
        },
      ],
    })
    .trigger(`touchmove`, 440, 50, {
      changedTouches: [
        {
          clientX: 440,
          clientY: 50,
        },
      ],
    })
    .trigger(`touchend`, 440, 50, {
      changedTouches: [
        {
          clientX: 440,
          clientY: 50,
        },
      ],
    });
});