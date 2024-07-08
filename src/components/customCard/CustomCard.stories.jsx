import CustomCard  from './CustomCard';

export default {
  component: CustomCard,
};

export const charmander = {
  args:{
    title:"charmander",
    handleClick:()=>{ console.log('charmander') },
    fetchUrl:`https://pokeapi.co/api/v2/pokemon/charmander`,
    imageKey:'front_default',
    number: '4'
  }
};

export const bulbasaur = {
  args: {
    title: 'bulbasaur',
    handleClick: ()=>{ console.log('bulbasaur') },
    fetchUrl: `https://pokeapi.co/api/v2/pokemon/1/`,
    imageKey: 'front_default',
    number: '1'
  }
};
