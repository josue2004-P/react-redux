import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clienteAxios } from "../../api";
import {
  onAddNewEquipo,
  onDeleteEquipo,
  onLoadEquipos,
  onSetActiveEquipo,
  onUpdateEquipo,
  onLoadEquipo,
  onLogoutModalEquipo,
} from "../../store";

export const useEquipoStore = () => {
  const dispatch = useDispatch();
  const { equipos,equipo, activeEquipo } = useSelector(
    (state) => state.adminEquipo
  );

  const startSavingEquipo = async (equipo) => {
    try {
      // Creando
      const { data } = await clienteAxios.post(
        "/admin/equipo/agregar-equipo",
        equipo
      );
      dispatch(onAddNewEquipo({ ...equipo }));
      startLoadingEquipos();

    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingEquipo = async (id) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(`/admin/equipo/eliminar-equipo/${id}`);
      dispatch(onDeleteEquipo());
      startLoadingEquipos();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startUpdateEquipo = async (equipo) => {
    // Todo: Llegar al backend
    try {
      await clienteAxios.put(
        `/admin/equipo/actualizar-equipo/${equipo.no_serie}`,
        equipo
      );
      dispatch(onUpdateEquipo({ ...equipo }));
      startLoadingEquipos();
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  const startLoadingEquipos = async () => {
    try {
      const { data } = await clienteAxios.get(
        "/admin/equipo/obtener-equipos"
      );
      dispatch(onLoadEquipos(data.equipos));

      if (!data.ok) return dispatch(onLoadEquipos(data.msg));
    } catch (error) {
      console.log("Error cargando equipos");
      console.log(error);
    }
  };

  const startLoadingEquipo = async (equipo) => {
    try {
      const { data } = await clienteAxios.get(
        `/admin/equipo/obtener-equipo/${equipo}`,
      );
      dispatch(onLoadEquipo(data.equipo));

      if (!data.ok) return dispatch(onLoadEquipos(data.msg));
    } catch (error) {
      console.log("Error cargando operadores");
      console.log(error);
    }
  };

  
  const startLogoutModal = () =>{

    dispatch( onLogoutModalEquipo() );

  }

  return {
    //* Propiedades
    activeEquipo,
    equipo,
    equipos,
    hasEventSelected: !!activeEquipo,

    //* Métodos
    startLoadingEquipos,
    startLoadingEquipo,
    startSavingEquipo,
    startUpdateEquipo,
    startLogoutModal,
    startDeletingEquipo,
  };
};
