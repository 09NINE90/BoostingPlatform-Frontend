const offerData = {
    "offer": {
      "gameId": "wow",
      "gameName": "World of Warcraft",
      "offerId": "ascendant-skyrazor",
      "title": "Ascendant Skyrazor Boost",
      "description": "Buy Ascendant Skyrazor carry to expand your collection with this stunning mount from Queen Ansurek. It's not easy to complete the raid on Mythic difficulty, let alone obtain this horrendous creature.",
      "sections": [
        {
          "title": "What you will get",
          "type": "list",
          "items": [
            {
              "description": "Reins of the Ascendant Skyrazor flying mount"
            },
            {
              "description": "Mythic: Queen Ansurek and Cutting Edge: Queen Ansurek achievements"
            },
            {
              "description": "Queenslayer title"
            },
            {
              "description": "Chance to loot 632-639 item level gear"
            },
            {
              "description": "Chance to get Reins of the Sureki Skyrazor mount"
            }
          ]
        },
        {
          "title": "Additional options",
          "description": "Extra Divine Orbs — we'll additionally trade you this amount of orbs.",
          "type": "block",
          "items": [
            {
              "title": "Gear packs include",
              "type": "accordion-list",
              "items": [
                {"description":"Sorceress — Lifesprig, Deathrattle, Enfolding Dawn, Wanderlust, Doedre's Tenure, Goldrim, Meginord's Girdle, Doedre's Damning x2, Revered Resin;"},
                {"description":"Warrior — Hoghunt, Bristleboar, Briarpatch, Jarngreipr, Goldrim, Meginord's Girdle, Blackheart x2, Revered Resin;"},
                {"description":"Ranger — Quill Rain, Asphyxia's Wrath, Bristleboar, Briarpatch, Jarngreipr, Goldrim, Meginord's Girdle, Blackheart x2, Revered Resin;"},
                {"description":"Witch — Lifesprig, Deathrattle, Enfolding Dawn, Wanderlust, Doedre's Tenure, Goldrim, Meginord's Girdle, Doedre's Damning x2, Revered Resin;"},
                {"description":"Witch (Summoner) — Sceptre with +1 to Level of all Minion Skills and Spirit, Deathrattle, Enfolding Dawn, Wanderlust, Lochtonial Caress, Goldrim, Meginord's Girdle, Doedre's Damning x2, Revered Resin;"},
                {"description":"Mercenary — Rampart Raptor, Bristleboar, Briarpatch, Jarngreipr, Goldrim, Meginord's Girdle, Blackheart x2, Revered Resin;"},
                {"description":"Monk — The Blood Thorn, Bristleboar, Briarpatch, Jarngreipr, Goldrim, Meginord's Girdle, Blackheart x2, Revered Resin."},
            ]},
            {
              "title": "Requirements",
              "type": "accordion-list",
              "items": [
              {"description":"Level 16 character to equip any item from the list."},
            ]},
            {
              "title": "How it works",
              "type": "accordion-list",
              "items": [
                {"description":"Our support agent will contact you within 10-15 minutes after your order to clarify details and answer questions via live-chat or email;"},
                {"description":"Path of Exile 2 Leveling Gear for sale supplier will send you a friend request. After that, he will invite you to a group and request a trade;"},
                {"description":"For safety reasons, please put any Rare item inside the trade. Also, do not write anything about purchasing in the in-game chat;"},
                {"description":"Enjoy the results with our PoE 2 Leveling Gear for sale! Also, don't forget to leave reviews about the service on Trustpilot;"},
                {"description":"If you still have questions about the service or want some unusual options — feel free to text us! Even at 3:00 AM :) We're 24/7 online!"},
            ]},
          ]
        },
        {
          "type": "relatedOffers",
          "items": [
            {
              "id": "mythic-raid",
              "title": "Mythic Raid Boost",
              "image": "/images/mythic-raid.jpg",
              "price": 249.99
            },
            {
              "id": "arena-rating",
              "title": "Arena Rating Boost",
              "image": "/images/arena-rating.jpg",
              "price": 199.99
            },
            {
              "id": "mount-collection",
              "title": "Mount Collection Boost",
              "image": "/images/mount-collection.jpg",
              "price": 149.99
            }
        ]
      }, 
      {
        "title": "PoE 2 Leveling Gear FAQ",
        "type": "block",
        "items": [
          {
            "title": "What is PoE 2 Leveling Gear?",
            "type": "accordion",
            "data": "It’s a set of equipment specifically designed to enhance your progression from early to mid-game in Path of Exile 2, offering essential stats like damage, life, and resistances.",
          },
          {
            "title": "Why is PoE 2 Leveling Gear important?",
            "type": "accordion",
            "data":"Proper leveling gear dramatically shortens your leveling time. By equipping items with strong flat damage or defensive stats, you can clear content faster and survive tougher encounters early on.",
          },
          {
            "title": "Where can I buy PoE 2 Leveling Gear?",
            "type": "accordion",
            "data":"You can find it at Overgear, where we provide affordable, well-curated pieces to ensure your character stays powerful and efficient throughout the leveling process.",
          },
        ]
      }
    ]
    }
  }

  const optionsData = [
    {
      id: "region",
      title: "Region",
      type: "buttons",
      multiple: false,
      items: [
        { value: "EU", label: "Europe", priceChange: 0, timeChange: 0 },
        { value: "US", label: "United States", priceChange: 10, timeChange: 1 },
      ],
    },
    {
      id: "boostMethod",
      title: "Boost Method",
      type: "select",
      multiple: false,
      items: [
        {
          value: "selfplay",
          label: "Self-play",
          priceChange: 0,
          timeChange: 0,
        },
        {
          value: "piloted",
          label: "Piloted",
          priceChange: 20,
          timeChange: 2,
          subOptions: [
            {
              id: "safety",
              title: "Safety Options",
              type: "checkbox",
              items: [
                {
                  value: "vpn",
                  label: "Use VPN",
                  priceChange: 5,
                  timeChange: 1,
                  subOptions: [
                    {
                      id: "Test 3 level",
                      title: "Level 3 options",
                      type: "slider",
                      min: 20,
                      max: 60,
                      step: 5,
                      priceChange: 0.5,
                      timeChange: 0,
                    },
                  ],
                },
                {
                  value: "stream",
                  label: "Live Stream",
                  priceChange: 0,
                  timeChange: 3,
                  percentChange: 50,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "raidTime",
      title: "Raid Time",
      type: "slider",
      min: 20,
      max: 60,
      step: 5,
      priceChange: 0.5,
      timeChange: 0,
    },
    {
      id: "additionalOptions",
      title: "Additional Options",
      type: "checkbox",
      items: [
        { value: "stream", label: "Stream Service", priceChange: 10, timeChange: 2, percentChange: 50},
        { value: "priority", label: "Priority Order", priceChange: 30, timeChange: -5 },
      ],
    },
  ];

  export {offerData, optionsData};