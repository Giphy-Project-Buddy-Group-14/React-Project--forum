import PropTypes from 'prop-types';

export default function Filter({ filters, onChange }) {

  return (
    <div>
      {Object.keys(filters).map((filter) => {
        const filterItems = filters[filter] || [];

        return (
          <div key={filter}>
            <h3 className="ml-3">
              {filter} ({filterItems.length})
            </h3>
            {(filterItems).map((name) => (
              <div className="border-b border-gray-200 pb-1" key={name}>
                <label className="ml-3 text-sm text-gray-600 pt-2 flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>{name}</div>
                </label>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}


Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}