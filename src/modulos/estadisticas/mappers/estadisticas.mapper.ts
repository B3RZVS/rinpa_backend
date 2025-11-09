export class EstadisticasMapper {
  static toReporteSemanal({
    entregas,
    clientesConEntrega,
    fechaInicio,
    fechaFin,
  }: any) {
    const totalEntregas = entregas.length;

    const productosEntregados = [
      ...new Set(
        entregas.flatMap((e) =>
          e.detalles.map(
            (d) =>
              `${d.producto.tipoProducto.nombre} (${d.producto.medida.cantidad} ${d.producto.medida.unidad.simbolo})`,
          ),
        ),
      ),
    ];

    const consumoTotalNafta = entregas.reduce(
      (sum, e) => sum + (e.litrosGastados ?? 0),
      0,
    );

    const costoTotalNafta = entregas.reduce(
      (sum, e) => sum + (e.litrosGastados ?? 0) * (e.precioNafta.precio ?? 0),
      0,
    );

    return {
      concepto: 'Reporte Semanal de Actividad',
      detalle: 'Resumen general del período',
      fechaEmision: new Date(),
      periodo: `${fechaInicio} al ${fechaFin}`,
      totalEntregas,
      productosEntregados,
      clientesConEntrega,
      consumoTotalNafta,
      costoTotalNafta,
    };
  }

  static toReporteEntrega(
    entregas: any[],
    fechaInicio: string,
    fechaFin: string,
  ) {
    const data = entregas.map((e, index) => {
      const productosDetalle = e.detalles.map((d) => ({
        nombre: `${d.producto.tipoProducto.nombre} ${d.producto.medida.cantidad}${d.producto.medida.unidad.simbolo}`,
        cantidad: d.cantidad,
        precio: d.producto.precio ?? 0,
      }));

      const subtotal = productosDetalle.reduce(
        (sum, p) => sum + p.cantidad * p.precio,
        0,
      );

      const totalCantidad = productosDetalle.reduce(
        (sum, p) => sum + p.cantidad,
        0,
      );

      const costoNafta = (e.litrosGastados ?? 0) * (e.precioNafta?.precio ?? 0);

      const total = subtotal + costoNafta;

      return {
        numeroEntrega: (index + 1).toString().padStart(3, '0'),
        fecha: e.fecha,
        cliente: `${e.cliente.nombre} ${e.cliente.apellido}`,
        productos: productosDetalle
          .map((p) => `${p.nombre} (${p.cantidad} x $${p.precio.toFixed(2)})`)
          .join(', '),
        cantidadProductosEntregados: totalCantidad,
        costoUnitarioPromedio: subtotal / (totalCantidad || 1),
        subtotal,
        naftaConsumida: e.litrosGastados ?? 0,
        costoNafta,
        total,
      };
    });

    const totalGeneral = data.reduce(
      (acc, e) => {
        acc.cantidadProductosEntregados += e.cantidadProductosEntregados;
        acc.subtotal += e.subtotal;
        acc.litrosNafta += e.naftaConsumida;
        acc.costoNafta += e.costoNafta;
        acc.total += e.total;
        return acc;
      },
      {
        cantidadProductosEntregados: 0,
        subtotal: 0,
        litrosNafta: 0,
        costoNafta: 0,
        total: 0,
      },
    );

    return {
      periodo: `${fechaInicio} al ${fechaFin}`,
      entregas: data,
      totalGeneral,
    };
  }

  static toReporteCliente(
    entregas: any[],
    fechaInicio?: string,
    fechaFin?: string,
  ) {
    const clientesMap = new Map();

    for (const e of entregas) {
      const id = e.cliente.id;

      if (!clientesMap.has(id)) {
        clientesMap.set(id, {
          nombre: e.cliente.nombre,
          entregasRealizadas: 0,
          cantidadProductosTotales: 0,
          totalFacturado: 0,
          productos: {} as Record<string, { cantidad: number; medida: string }>,
        });
      }

      const cliente = clientesMap.get(id);
      cliente.entregasRealizadas += 1;

      for (const d of e.detalles) {
        cliente.cantidadProductosTotales += d.cantidad;
        const subtotal = d.cantidad * (d.producto.precio ?? 0);
        cliente.totalFacturado += subtotal;

        const tipo = d.producto.tipoProducto.nombre;

        if (!cliente.productos[tipo]) {
          cliente.productos[tipo] = {
            cantidad: 0,
            medida: `${d.producto.medida.cantidad}${d.producto.medida.unidad.simbolo}`,
          };
        }

        cliente.productos[tipo].cantidad += d.cantidad;
      }
    }

    const clientes = Array.from(clientesMap.values()).map((c) => {
      const entries = Object.entries(c.productos) as [
        string,
        { cantidad: number; medida: string },
      ][];

      if (entries.length === 0) return { ...c, productoMasPedido: '-' };

      const [nombreProducto, data] = entries.sort(
        (a, b) => b[1].cantidad - a[1].cantidad,
      )[0];

      const productoMasPedido = `${nombreProducto} (${data.medida})`;

      return {
        nombre: c.nombre,
        entregasRealizadas: c.entregasRealizadas,
        productoMasPedido,
        totalFacturado: c.totalFacturado,
      };
    });

    return {
      periodo:
        fechaInicio && fechaFin
          ? `${fechaInicio} al ${fechaFin}`
          : 'Histórico completo',
      clientes,
    };
  }
}
