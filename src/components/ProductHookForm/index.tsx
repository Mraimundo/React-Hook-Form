import { useFieldArray, useForm } from 'react-hook-form';

interface IProduct {
  code: string;
  description: string;
  price?: number;
}

type FormValue = {
  products: IProduct[];
}

export const ProductHookForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValue>({ delayError: 500 });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products"
  });

  console.log("Erros", errors);

  const add = () => {
    append({
      code: "",
      description: "",
      price: undefined,
    });
  }

  return (
    <div>
      <h2>Produtos</h2>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        {fields.map((product, index) => (
          <div key={product.id} className='row'>
            {index + 1}
            <input
              type="text"
              placeholder="Code"
              {...register(`products.${index}.code`, {
                required: "Por favor, preencha o campo code",
              })}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              {...register(`products.${index}.description`)}
            />
            <input
              type="text"
              placeholder="Price"
              {...register(`products.${index}.price`)}
            />

            <button onClick={() => remove(index)} className="delete">
              Deletar
            </button>
          </div>
        ))}
        <button onClick={add} className='add'>
          Add
        </button>
      </form>
      <button type="submit" className='enviar'>Enviar</button>


      <pre>
        <code>{JSON.stringify(fields, null, 2)}</code>
      </pre>
    </div>
  )
}