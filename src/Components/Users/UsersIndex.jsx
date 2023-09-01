import {
  Create,
  Datagrid,
  Edit,
  List, FunctionField,
  Show,
  SimpleForm,
  TextField, CreateButton,
  TextInput, TopToolbar,
  useTranslate, TabbedShowLayout, Tab, useShowController, DeleteButton, Button, useRedirect,
} from "react-admin";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from '@mui/icons-material/Add';

const validatePhone = (value) => {
  if (value) {
    const values = value.toString();
    const numbers = /[0-9]/g;
    if (values?.length !== 10) {
      return "Number must be 10 figures";
    }
    if (!values?.match(numbers)) {
      return "Number must be 10 figures";
    } else {
      return undefined;
    }
  }
};


const UserCreate = (props) => {

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput
          source="firstName"
          autoComplete="off"
          required
          name={"firstName"}
        />
        <TextInput
          source="lastName"
          autoComplete="off"
          required
          name={"lastName"}
        />
        <TextInput
          source="address"
          autoComplete="off"
          required
          name={"address"}
        />
        <TextInput
          source="phoneNumber"
          autoComplete="off"
          helperText={"Number must be 10 figures"}
          required
          name={"phoneNumber"}
          validate={[validatePhone]}
        />
      </SimpleForm>
    </Create>
  );
};

const Icon = () => {
  return <div style={{ fontSize: 14 }}>
    <AddIcon />
    {'Create Hobby'}
  </div>
}
const ListActions = () => {
  const redirect = useRedirect()
  return <TopToolbar>
    <Button
      color="primary"
      size="small"
      onClick={() => redirect('/hobbies/create')}
      startIcon={<Icon />}
    >
    </Button>
    <CreateButton />
  </TopToolbar>
}
const UsersList = (props) => {
  return (
    <List
      {...props}
      sort={{ field: "id", order: "DESC" }}
      actions={<ListActions />}
    >
      <Datagrid bulkActionButtons={false} optimized>
        <TextField
          source="id"
          bulkActionButtons={false}
          autoComplete="off"
        />
        <TextField
          source="firstName"
          bulkActionButtons={false}
          autoComplete="off"
        />
        <TextField source="lastName" autoComplete="off" />
        <TextField source="address" autoComplete="off" />
        <TextField source="phoneNumber" autoComplete="off" />

        <FunctionField
          label={'hobbies'}
          render={(record) => {
            const { hobbies } = record
            if (!hobbies) {
              return ''
            }
            let list = hobbies.map((h) => h.hobby)
            list = list.join(', ')
            return list


          }} />
        <DeleteButton />
      </Datagrid>
    </List>
  );
};
const UserShow = (props) => {
  const {
    record, // record fetched via dataProvider.getOne() based on the id from the location
  } = useShowController(props);
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label={"user"}>
          <TextField
            source="id"
            bulkActionButtons={false}
            autoComplete="off"
          />
          <TextField
            source="firstName"
            bulkActionButtons={false}
            autoComplete="off"
          />
          <TextField source="lastName" autoComplete="off" />
          <TextField source="address" autoComplete="off" />
          <TextField source="phoneNumber" autoComplete="off" />
          sortable={false}
        </Tab>
        <Tab label={"hobbies"}>
          <List
            resource="hobbies"
            filter={{ "user.id": record?.id }}
            hasCreate={false}
            sort={{ field: "id", order: "DESC" }}
            exporter={false}

          >
            <Datagrid rowClick="show" header={() => ''} bulkActionButtons={false} optimized>

              <TextField source="hobby" autoComplete="off" />

            </Datagrid>
          </List>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

const UserEdit = (props) => {


  const t = useTranslate();
  return (
    <Edit {...props}>
      <SimpleForm redirect="show">
        <TextInput
          source="firstName"
          autoComplete="off"
          name={"firstName"}
          required
        />
        <TextInput
          source="lastName"
          name="lastName"
          autoComplete="off"
          required
        />
        <TextInput
          source="address"
          autoComplete="off"
          name={"address"}
          required
        />
        <TextInput
          source="phoneNumber"
          validate={[validatePhone]}
          name="phoneNumber"
          autoComplete="off"
        />
      </SimpleForm>
    </Edit>
  );
};
export default {
  list: UsersList,
  create: UserCreate,
  show: UserShow,
  edit: UserEdit,
  icon: EngineeringIcon,
};
