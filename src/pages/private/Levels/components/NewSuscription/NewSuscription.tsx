import { useEffect, useState } from "react";
import {
  SuscriptionCreateDto,
  SuscriptionDto,
} from "../../types/Suscription.types";
import style from "./NewSuscription.module.css";
import { levelDto } from "../../types/Levels.types";
import LevelsService from "../../services/Levels.service";
import MessageError from "../../../../../components/ConfirCancelReservation/MessageError";
import Benefits from "./components/Benefits/Benefits";
import PaymentMethods from "./components/PaymentMethods/PaymentMethods";
import { Benefit } from "../../types/Benefits.types";
import { PaymentMethod } from "../../types/PaymentMethods.types";
import NewSuscriptionServices from "./services/NewSuscription.service";

interface NewSubscriptionProps {
  onComplete: () => void;
}
const NewSuscription: React.FC<NewSubscriptionProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<SuscriptionCreateDto>({
    idLevel: 0,
    title: "",
    description: "",
    amount: 0,
    discountPercentage: 0,
    numInstallments: 0,
  });

  const [levels, setLevels] = useState<levelDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [selectNew, setSelectNew] = useState<number>(0);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const result = await LevelsService.crud().findAll();
        setLevels(result);
      } catch (error) {
        setError(`${error}`);
      }
    };
    fetchLevels();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const service = NewSuscriptionServices.crud();
      const { id } = await service.create<SuscriptionCreateDto, SuscriptionDto>(
        formData
      );

      service.setUrl(`benefits`);

      await service.update<number, number[]>(
        id,
        benefits.map((b) => b.id)
      );

      service.setUrl(`payment-methods`);
      await service.update<number, number[]>(
        id,
        paymentMethods.map((b) => b.id)
      );

      if (selectNew == 1) {
      }
      onComplete(); // Finaliza el proceso
      setSelectNew(0);
    } catch (error) {
      setError(`${error}`);
    }
  };

  return (
    <div className={style.container}>
      <p className={style.container_title}>Crear Nueva Suscripción</p>
      {error && (
        <MessageError
          title="Error"
          message={error}
          cancel={() => setError(null)}
        />
      )}
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="idLevel">Nivel</label>
          <select
            id="idLevel"
            name="idLevel"
            value={formData.idLevel}
            onChange={handleChange}
            required
          >
            <option value={0}>Seleccionar Nivel</option>
            {levels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.title}
              </option>
            ))}
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            className={style.form_input}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            className={style.form_textarea}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="amount">Monto</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className={style.form_input}
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="discountPercentage">Porcentaje de Descuento</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            className={style.form_input}
            value={formData.discountPercentage}
            onChange={handleChange}
            required
          />
        </div>
        <div className={style.formGroup}>
          <label htmlFor="numInstallments">Número de Cuotas</label>
          <input
            type="number"
            id="numInstallments"
            name="numInstallments"
            className={style.form_input}
            value={formData.numInstallments}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <p className={style.container_subtitle}>Beneficios</p>
          <Benefits
            selectedBenefits={benefits}
            setSelectedBenefits={setBenefits}
          />
        </div>

        <div>
          <p className={style.container_subtitle}>Metodos de Pago</p>
          <PaymentMethods
            selectedPaymentMethods={paymentMethods}
            setSelectedPaymentMethods={setPaymentMethods}
          />
        </div>
        <div className={style.container_button}>
          <button
            onClick={() => setSelectNew(1)}
            type="submit"
            className={style.submitButton}
          >
            Crear y Cerrar
          </button>

          <button
            type="submit"
            onClick={() => setSelectNew(0)}
            className={style.submitButton}
          >
            Crear
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewSuscription;
