
export default function Filter({ filters, onChange }) {

  console.log('filters', filters);

  return (
    <div className="bg-white">
      {Object.keys(filters).map((filter) => {
        const filterItems = filters[filter] || [];

        return (
          <div key={filter}>
            <h3 className="-my-3 flow-root">
              {filter} ({filterItems.length})
            </h3>
            {(filterItems).map((name) => (
              <div className="border-b border-gray-200" key={name}>
                <label className="ml-3 text-sm text-gray-600 pt-2 flex names-center">
                  <input type="checkbox" className="h-4 w-4 pr-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  {name}
                </label>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
