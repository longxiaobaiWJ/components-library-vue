import App from '../App.vue';

export default {
  title: 'Example/App',
  component: App,
  args: {
    // Now all Button stories will be primary.
  },
};

const Template = (args, { argTypes }) => ({
	props: Object.keys(argTypes),
	components: { App },
	template: '<app :source="source"/>',
  });
  
  export const Components = Template.bind({});
  Components.args = {
	source: "This is Params Example"
  };