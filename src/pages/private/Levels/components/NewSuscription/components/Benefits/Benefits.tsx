import { useEffect, useState } from "react";
import { Benefit, BenefitCreate } from "../../../../types/Benefits.types";
import BenefitsServices from "./services/Benefits.service";
import MessageError from "../../../../../../../components/ConfirCancelReservation/MessageError";
import style from "./Benefits.module.css"

interface BenefitsProps {
  selectedBenefits: Benefit[];
  setSelectedBenefits: (benefit: Benefit[]) => void;
}

const Benefits: React.FC<BenefitsProps> = ({
  selectedBenefits,
  setSelectedBenefits,
}) => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BenefitCreate>({
    description: "",
  });

  const fetchBenefits = async () => {
    try {
      const res = await BenefitsServices.crud().findAll();
      setBenefits(res);
    } catch (error) {
      setError(`${error}`);
    }
  };

  useEffect(() => {
    fetchBenefits();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await BenefitsServices.crud().create<BenefitCreate>(formData);
      setFormData({
        description: "",
      });
      fetchBenefits();
    } catch (error) {
      setError(`${error}`);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectBenefit = (benefit: Benefit) => {
    if (selectedBenefits.includes(benefit)) {
      setSelectedBenefits(selectedBenefits.filter((b) => b.id !== benefit.id));
    } else {
      setSelectedBenefits([...selectedBenefits, benefit]);
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
        <p className={style.container_list_title}>Listado de beneficios</p>
        <table className={style.table}>
          <thead className={style.thead}>
            <tr>
              <th>Seleccionar</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody className={style.tbody}>
            {benefits.map((benefit) => (
              <tr key={benefit.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedBenefits.includes(benefit)}
                    onChange={() => handleSelectBenefit(benefit)}
                  />
                </td>
                <td>{benefit.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={style.container_new}>
        <p className={style.container_new_title}>Crear un nuevo beneficio</p>
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

export default Benefits;
