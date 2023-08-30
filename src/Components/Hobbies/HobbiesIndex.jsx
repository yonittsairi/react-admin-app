import {
  Create,
  Datagrid,
  DateField,
  Edit,
  FunctionField,
  List,
  required,
  Show,
  SimpleForm,
  Tab,
  TabbedShowLayout,
  TextField,
  TextInput,
  useShowController, ReferenceInput, AutocompleteInput, ReferenceField
} from "react-admin";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";


const HobbiesCreate = (props) => {
  return (
    <Create {...props} redirect={false} hasShow={false} >
      <SimpleForm >
        <ReferenceInput
          validate={[required()]}
          label={'user'}
          source="userId"
          reference="user"
          required

        >
          <AutocompleteInput
            optionText={(record) =>
              record
                ? `${record.firstName}  ${record.lastName} `
                : ``
            }
            translateChoice={false}
            validate={[required()]}
          />
        </ReferenceInput>
        <TextInput
          source="hobby"
          autoComplete="off"
          name={"hobby"}
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};


const HobbiesList = (props) => {
  return (
    <List
      {...props}
      sort={{ field: "id", order: "DESC" }}

    >
      <Datagrid rowClick="show" bulkActionButtons={false} optimized>
        <ReferenceField
          source="userId"
          reference="user"
          link=""
          basePath={""}
        >
          <FunctionField
            render={(record) => {
              return (
                record.firstName + " " + record.lastName
              );
            }}
          />
        </ReferenceField>
        <TextField source="hobby" autoComplete="off" name={"hobbies"} />

      </Datagrid>
    </List>
  );
};
const HobbiesShow = (props) => {

  return (
    <Show {...props}>
      <ReferenceField
        source="userId"
        reference="user"
        link=""
        basePath={""}
        label={'user'}
      >
        <FunctionField
          label={'user'}
          render={(record) => {
            return (
              record.firstName + " " + record.lastName
            );
          }}
        />
      </ReferenceField>
      <TextField label={'hobbies'} source="hobby" autoComplete="off" name={"hobbies"} />
    </Show>
  );
};

const HobbiesEdit = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm redirect="list">
        <ReferenceInput
          validate={[required()]}
          label={"user"}
          source="userId"
          reference="user"
          filterToQuery={(searchText) => {
            if (searchText)
              return {
                q: {
                  $or: [
                    { firstName: { $cont: searchText } },
                    { lastName: { $cont: searchText } },
                  ]
                },
                isSearch: true
              };
          }}

        >

          <AutocompleteInput
            optionText={(record) =>
              record
                ? `${record.firstName}  ${record.lastName} `
                : ``
            }
            translateChoice={false}
            validate={[required()]}
          />
        </ReferenceInput>
        <TextInput
          source="hobbies"
          autoComplete="off"
          name={"hobby"}
          required
        />
      </SimpleForm>
    </Edit>
  );
};
export default {
  list: HobbiesList,
  show: HobbiesShow,
  create: HobbiesCreate,
  edit: HobbiesEdit,
  icon: LocalDrinkIcon,
};
