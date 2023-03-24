import { IRow } from "../interafaces/blocks";

const Row = ({ data, index }: Partial<IRow>) => {
  return (
    <tr>
      <td>{data?.id}</td>
      <td>{data?.firstName + " " + data?.lastName}</td>
      <td>{data?.age}</td>
      <td>{data?.birthDate}</td>
      <td>{data?.bloodGroup}</td>
      <td>{data?.eyeColor}</td>
      <td>{data?.university}</td>
      <td>{data?.company?.name}</td>
    </tr>
  );
};

export default Row;
