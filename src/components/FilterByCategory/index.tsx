import { categories } from '../../data/categories'
import { useBudget } from '../../hooks/useBudget'

export const FilterByCategory = () => {
  const { dispatch } = useBudget()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'filter-by-category',
      payload: { id: e.target.value }
    })
  }

  return (
    <div className='bg-white p-10 rounded-lg shadow-lg'>
      <form>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor='category'>Filtrar gastos</label>
          <select
            onChange={handleChange}
            id='category'
            className='bg-gray-100 p-3 flex-1 rounded-md'
          >
            <option value=''>Todas las categorías</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  )
}
