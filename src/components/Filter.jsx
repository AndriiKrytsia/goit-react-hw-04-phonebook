export function Filter({ filter, onChangeFilter }) {
  return (
    <input onChange={onChangeFilter} value={filter} type="text" name="filter" />
  );
}
