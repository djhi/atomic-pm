import { Edit, SimpleForm, TextInput, useGetIdentity } from "react-admin"

export const ProfileEdit = () => {
    const { identity } = useGetIdentity();

    return (
        <Edit resource="profiles" id={identity?.id}>
            <SimpleForm>
                <TextInput source="first_name" />
                <TextInput source="last_name" />
            </SimpleForm>
        </Edit>
    )
}