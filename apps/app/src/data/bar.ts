export const bar = [
  {
    name: 'boissons',
    categories: [
      {
        name: 'sodas',
        data: [
          { nom: 'Coca-Cola', contenance: '33cl', prix: '3,00€' },
          { nom: 'Coca-Cola Zéro', contenance: '33cl', prix: '3,00€' },
          { nom: 'Sprite', contenance: '33cl', prix: '3,00€' },
          { nom: 'Fanta Orange', contenance: '33cl', prix: '3,00€' },
          { nom: 'Fanta Citron', contenance: '33cl', prix: '3,00€' },
          { nom: 'Perrier', contenance: '33cl', prix: '2,50€' },
          { nom: 'Schweppes Agrum’', contenance: '33cl', prix: '3,50€' },
          { nom: 'Canada Dry', contenance: '33cl', prix: '3,50€' },
          { nom: 'Orangina', contenance: '33cl', prix: '3,50€' },
          { nom: 'Ice Tea Pêche', contenance: '33cl', prix: '3,50€' },
          { nom: 'Eau plate', contenance: '50cl', prix: '2,00€' },
          { nom: 'Eau gazeuse', contenance: '50cl', prix: '2,50€' }
        ]
      },
      {
        name: 'bieres',
        data: [
          { nom: 'Heineken', contenance: '25cl', prix: '4,50€' },
          { nom: 'Heineken', contenance: '50cl', prix: '7,00€' },
          { nom: 'Leffe Blonde', contenance: '25cl', prix: '5,00€' },
          { nom: 'Leffe Ruby', contenance: '25cl', prix: '5,50€' },
          { nom: 'Guinness', contenance: '33cl', prix: '6,00€' },
          { nom: 'Corona', contenance: '35,5cl', prix: '5,50€' },
          { nom: 'Desperados', contenance: '33cl', prix: '6,00€' },
          { nom: 'Grimbergen Ambrée', contenance: '25cl', prix: '5,50€' },
          { nom: 'Budweiser', contenance: '33cl', prix: '5,00€' },
          { nom: 'Stella Artois', contenance: '25cl', prix: '4,50€' }
        ]
      },
      {
        name: 'vins spiritueux',
        data: [
          { nom: 'Verre de vin rouge', contenance: '12cl', prix: '5,00€' },
          { nom: 'Verre de vin blanc', contenance: '12cl', prix: '5,00€' },
          { nom: 'Verre de rosé', contenance: '12cl', prix: '5,00€' },
          { nom: 'Whisky (Jack Daniel’s)', contenance: '4cl', prix: '7,50€' },
          { nom: 'Rhum ambré', contenance: '4cl', prix: '7,00€' },
          { nom: 'Vodka (Absolut)', contenance: '4cl', prix: '6,50€' },
          { nom: 'Gin (Bombay Sapphire)', contenance: '4cl', prix: '7,00€' },
          { nom: 'Tequila', contenance: '4cl', prix: '6,50€' }
        ]
      }
    ]
  },
  {
    name: 'cocktails',
    categories: [
      {
        name: 'avec alcool',
        data: [
          {
            nom: 'Mojito',
            contenance: '35cl',
            prix: '7,50€',
            description:
              'Rhum blanc, menthe fraîche, citron vert, sucre de canne, eau gazeuse'
          },
          {
            nom: 'Piña Colada',
            contenance: '35cl',
            prix: '8,00€',
            description: 'Rhum blanc, crème de coco, jus d’ananas'
          },
          {
            nom: 'Margarita',
            contenance: '30cl',
            prix: '7,50€',
            description: 'Tequila, triple sec, jus de citron vert'
          },
          {
            nom: 'Sex on the Beach',
            contenance: '35cl',
            prix: '8,00€',
            description:
              'Vodka, liqueur de pêche, jus d’orange, jus de cranberry'
          },
          {
            nom: 'Caipirinha',
            contenance: '30cl',
            prix: '7,50€',
            description: 'Cachaça, citron vert, sucre de canne'
          },
          {
            nom: 'Tequila Sunrise',
            contenance: '35cl',
            prix: '8,00€',
            description: 'Tequila, jus d’orange, grenadine'
          },
          {
            nom: 'Blue Lagoon',
            contenance: '35cl',
            prix: '8,00€',
            description: 'Vodka, curaçao bleu, citron vert'
          },
          {
            nom: 'Daiquiri Fraise',
            contenance: '30cl',
            prix: '8,50€',
            description: 'Rhum blanc, fraises fraîches, sucre, citron vert'
          },
          {
            nom: 'Gin Tonic',
            contenance: '35cl',
            prix: '7,50€',
            description: 'Gin, eau tonique, citron'
          }
        ]
      },
      {
        name: 'sans alcool',
        data: [
          {
            nom: 'Virgin Mojito',
            contenance: '35cl',
            prix: '6,00€',
            description:
              'Menthe fraîche, citron vert, sucre de canne, eau gazeuse'
          },
          {
            nom: 'Sunrise Tropical',
            contenance: '35cl',
            prix: '6,50€',
            description: 'Jus d’orange, grenadine, citron vert'
          },
          {
            nom: 'Exotic Dream',
            contenance: '35cl',
            prix: '7,00€',
            description: 'Jus d’ananas, lait de coco, sirop de vanille'
          },
          {
            nom: 'Fruity Delight',
            contenance: '35cl',
            prix: '6,50€',
            description: 'Jus de fraise, jus de mangue, citron vert'
          },
          {
            nom: 'Green Paradise',
            contenance: '35cl',
            prix: '6,50€',
            description: 'Jus de pomme, kiwi, citron vert'
          },
          {
            nom: 'Berry Bliss',
            contenance: '35cl',
            prix: '7,00€',
            description: 'Jus de framboise, jus de cranberry, menthe'
          }
        ]
      }
    ]
  },
  {
    name: 'snacks plats',
    categories: [
      {
        name: 'aperitifs tapas',
        data: [
          { nom: 'Assiette de frites', prix: '4,50€' },
          { nom: 'Nachos au fromage', prix: '6,50€' },
          { nom: 'Planche mixte (charcuterie & fromage)', prix: '12,00€' },
          { nom: 'Ailes de poulet marinées (6 pièces)', prix: '7,50€' },
          { nom: 'Nuggets de poulet (6 pièces)', prix: '6,50€' },
          { nom: 'Olives marinées', prix: '3,50€' },
          { nom: 'Assiette de saucisson', prix: '5,50€' },
          { nom: 'Camembert rôti au miel', prix: '9,00€' }
        ]
      },
      {
        name: 'plats consistants',
        data: [
          { nom: 'Burger classique', prix: '12,50€' },
          { nom: 'Burger végétarien', prix: '11,50€' },
          { nom: 'Hot-dog à l’américaine', prix: '7,50€' },
          { nom: 'Croque-monsieur', prix: '6,50€' },
          { nom: 'Club sandwich', prix: '9,00€' },
          { nom: 'Salade César', prix: '11,00€' }
        ]
      }
    ]
  }
]
