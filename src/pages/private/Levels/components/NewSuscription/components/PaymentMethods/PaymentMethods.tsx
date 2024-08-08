import { useEffect, useState } from "react";
import { PaymentMethod, PaymentMethodCreate } from "../../../../types/PaymentMethods.types";
import MessageError from "../../../../../../../components/ConfirCancelReservation/MessageError";
import PaymentMethodsService from "./services/PaymentMethods.service";
import style from "./PaymentMethods.module.css";

interface PaymentMethodsProps {
    selectedPaymentMethods: PaymentMethod[];
    setSelectedPaymentMethods: (selectedPaymentMethods: PaymentMethod[])=> void
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
    selectedPaymentMethods,
    setSelectedPaymentMethods
}) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PaymentMethodCreate>({
    description: "",
  });

  const fetchPaymentMethods = async () => {
    try {
      const res = await PaymentMethodsService.crud().findAll();
      setPaymentMethods(res);
    } catch (error) {
      setError(`${error}`);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await PaymentMethodsService.crud().create<PaymentMethodCreate>(formData);
      setFormData({
        description: "",
      });
      fetchPaymentMethods();
    } catch (error) {
      setError(`${error}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectPaymentMethod = (paymentMethod: PaymentMethod) => {
    if (selectedPaymentMethods.includes(paymentMethod)) {
      setSelectedPaymentMethods(selectedPaymentMethods.filter(pm => pm.id !== paymentMethod.id));
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, paymentMethod]);
    }
  };

  return (
    <div className={style.container}>
      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}

      <div className={style.container_list}>
        <p className={style.container_list_title}>Lista de Métodos de Pago</p>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th>Seleccionar</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {paymentMethods.map((paymentMethod) => (
              <tr key={paymentMethod.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedPaymentMethods.includes(paymentMethod)}
                    onChange={() => handleSelectPaymentMethod(paymentMethod)}
                  />
                </td>
                <td>{paymentMethod.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.container_new}>
        <p className={style.container_new_title}>Crear un nuevo Método de Pago</p>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label className={style.label} htmlFor="description">Descripción *</label>
            <input
              type="text"
              id="description"
              name="description"
              className={style.form_input}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button className={style.form_button} type="submit">Crear</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentMethods;
