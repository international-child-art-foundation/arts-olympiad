"use client";

import { artworks } from "../../../mock/artworks";
import CheckBoxs from "./CheckBoxs";

const sport = [
  { name: "Archery", number: 0}, 
  { name: "Artistic Gymnastics", number: 0}, 
  { name: "Athletics", number: 0}, 
  { name: "Badminton", number: 0}, 
  { name: "Basketball", number: 0}, 
  { name: "Boxing", number: 0}, 
  { name: "Cycling Track", number: 0}, 
  { name: "Equestrian", number: 0}, 
  { name: "Fencing", number: 0}, 
  { name: "Football", number: 0}, 
  { name: "Golf", number: 0},  
  { name: "High jump", number: 0},
  { name: "Hockey", number: 0}, 
  { name: "Judo", number: 0}, 
  { name: "Rowing", number: 0}, 
  { name: "Rugby", number: 0}, 
  { name: "Sailing", number: 0}, 
  { name: "Shooting", number: 0}, 
  { name: "Table Tennis", number: 0}, 
  { name: "Taekwondo", number: 0}, 
  { name: "Tennis", number: 0}, 
  { name: "Volleyball", number: 0}, 
  { name: "Wallball", number: 0}, 
  { name: "Weightlifting", number: 0}, 
  { name: "Yoga", number: 0}, 
  { name: "Zumba", number: 0} 
];

const countSportNumber = artworks.map(artwork => {
  for(let i = 0; i < sport.length; i++) {
    for(let j = 0; j < artwork.sport.length; j++) {
      if(artwork.sport[j] === sport[i].name){
        sport[i].number += 1;
      }
    }
  }
});
console.log(countSportNumber);
const Africa = [
  { name: "Nigeria", number: 0}, 
  { name: "Ethiopia", number: 0}, 
  { name: "Egypt", number: 0}, 
  { name: "Democratic Republic of the Congo", number: 0}, 
  { name: "South Africa", number: 0}, 
  { name: "Algeria", number: 0}, 
  { name: "Tanzania", number: 0}, 
  { name: "Kenya", number: 0}, 
  { name: "Morocco", number: 0}, 
  { name: "Uganda", number: 0}, 
  { name: "Sudan", number: 0},  
  { name: "Ghana", number: 0}, 
  { name: "Mozambique", number: 0}, 
  { name: "Madagascar", number: 0}, 
  { name: "Ivory Coast", number: 0}, 
  { name: "Cameroon", number: 0}, 
  { name: "Burkina Faso", number: 0}, 
  { name: "Niger", number: 0}, 
  { name: "Malawi", number: 0}, 
  { name: "Senegal", number: 0}
];

const Australia = [
  { name: "Australia", number: 0}, 
  { name: "Papua New Guinea", number: 0}, 
  { name: "New Zealand", number: 0}, 
  { name: "Fiji", number: 0}, 
  { name: "Solomon Islands", number: 0}, 
  { name: "Vanuatu", number: 0}
];

const Asia = [
  { name: "China", number: 0}, 
  { name: "India", number: 0}, 
  { name: "Indonesia", number: 0}, 
  { name: "Pakistan", number: 0}, 
  { name: "Bangladesh", number: 0}, 
  { name: "Japan", number: 0}, 
  { name: "Philippines", number: 0}, 
  { name: "Egypt", number: 0}, 
  { name: "Vietnam", number: 0}, 
  { name: "Iran", number: 0}, 
  { name: "Thailand", number: 0},  
  { name: "Myanmar", number: 0}, 
  { name: "South Korea", number: 0}, 
  { name: "Iraq", number: 0}, 
  { name: "Afghanistan", number: 0}, 
  { name: "Saudi Arabia", number: 0}, 
  { name: "Uzbekistan", number: 0}, 
  { name: "Malaysia", number: 0}, 
  { name: "Yemen", number: 0}, 
  { name: "Nepal", number: 0}, 
  { name: "North Korea", number: 0}
];

const Europe = [
  { name: "Russia", number: 0}, 
  { name: "Turkey", number: 0}, 
  { name: "Germany", number: 0}, 
  { name: "France", number: 0}, 
  { name: "United Kingdom", number: 0}, 
  { name: "Italy", number: 0}, 
  { name: "Spain", number: 0}, 
  { name: "Ukraine", number: 0}, 
  { name: "Poland", number: 0}, 
  { name: "Romania", number: 0}, 
  { name: "Kazakhstan", number: 0},  
  { name: "Netherlands", number: 0}, 
  { name: "Belgium", number: 0}, 
  { name: "Czech Republic", number: 0}, 
  { name: "Portugal", number: 0}, 
  { name: "Greece", number: 0}, 
  { name: "Sweden", number: 0}, 
  { name: "Azerbaijan", number: 0}, 
  { name: "Hungary", number: 0}, 
  { name: "Belarus", number: 0}, 
  { name: "Austria", number: 0}, 
  { name: "Switzerland", number: 0}, 
  { name: "Bulgaria", number: 0}, 
  { name: "Serbia", number: 0}, 
  { name: "Denmark", number: 0}, 
  { name: "Finland", number: 0}, 
  { name: "Slovakia", number: 0}, 
  { name: "Norway", number: 0}, 
  { name: "Ireland", number: 0}, 
  { name: "Croatia", number: 0}
];

const NorthAmerica = [
  { name: "U.S.A.", number: 0}, 
  { name: "Mexico", number: 0}, 
  { name: "Canada", number: 0}, 
  { name: "Guatemala", number: 0}, 
  { name: "Haiti", number: 0}, 
  { name: "Cuba", number: 0}, 
  { name: "Dominican Republic", number: 0}, 
  { name: "Honduras", number: 0}, 
  { name: "Nicaragua", number: 0}, 
  { name: "El Salvador", number: 0}, 
  { name: "Costa Rica", number: 0},  
  { name: "Panama", number: 0}, 
  { name: "Puerto Rico", number: 0}, 
  { name: "Jamaica", number: 0}, 
  { name: "Trinidad and Tobago", number: 0}, 
  { name: "Nueva Esparta", number: 0}, 
  { name: "The Bahamas", number: 0}, 
  { name: "Belize", number: 0}, 
  { name: "Guadeloupe", number: 0}, 
  { name: "Martinique", number: 0}
];


const SouthAmerica = [
  { name: "Brazil", number: 0}, 
  { name: "Colombia", number: 0}, 
  { name: "Argentina", number: 0}, 
  { name: "Peru", number: 0}, 
  { name: "Venezuela", number: 0}, 
  { name: "Chile", number: 0}, 
  { name: "Ecuador", number: 0}, 
  { name: "Bolivia", number: 0}, 
  { name: "Paraguay", number: 0}, 
  { name: "Uruguay", number: 0}, 
  { name: "Guyana", number: 0},  
  { name: "Suriname", number: 0}, 
  { name: "French Guiana", number: 0}, 
  { name: "Falkland Islands", number: 0}
];

const countNumber = artworks.map(artwork => {
  for(let i = 0; i < Africa.length; i++) {
    if(artwork.country[0] === Africa[i].name){
      Africa[i].number += 1;
    }
  }

  for(let i = 0; i < Australia.length; i++) {
    if(artwork.country[0] === Australia[i].name){
      Australia[i].number += 1;
    }
  }

  for(let i = 0; i < Asia.length; i++) {
    if(artwork.country[0] === Asia[i].name){
      Asia[i].number += 1;
    }
  }

  for(let i = 0; i < Europe.length; i++) {
    if(artwork.country[0] === Europe[i].name){
      Europe[i].number += 1;
    }
  }

  for(let i = 0; i < NorthAmerica.length; i++) {
    if(artwork.country[0] === NorthAmerica[i].name){
      NorthAmerica[i].number += 1;
    }
  }

  for(let i = 0; i < SouthAmerica.length; i++) {
    if(artwork.country[0] === SouthAmerica[i].name){
      SouthAmerica[i].number += 1;
    }
  }
});

console.log(countNumber);

const filterableOptions = [
  {
    id: "sport",
    title: "Sports",
    options: sport,
    filterType: "checkbox",
  },
  {
    id: "country",
    title: "Africa",
    options: Africa,
    filterType: "checkbox",
  },
  {
    id: "country",
    title: "Australia/ Oceania",
    options: Australia,
    filterType: "checkbox",
  },
  {
    id: "country",
    title: "Asia",
    options: Asia,
    filterType: "checkbox",
  },
  {
    id: "country",
    title: "Europe",
    options: Europe,
    filterType: "checkbox",
  },
  {
    id: "country",
    title: "North America",
    options: NorthAmerica,
    filterType: "checkbox",
  },
  {
    id: "country",
    title: "South America",
    options: SouthAmerica,
    filterType: "checkbox",
  },
];

const Filters = () =>{
  
  return (
    <div className="realative w-full">
      <section className="w-1/5">
        {filterableOptions.map( ( { id, title, options, filterType } ) => {
          return (
            <>
              <section className="my-4">
                <CheckBoxs 
                  id={id}
                  title={title}
                  type={filterType}
                  options={options}
                
                />
              </section>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default Filters;
