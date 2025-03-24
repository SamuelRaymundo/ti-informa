package br.com.tiinforma.backend.domain.assinatura;

import br.com.tiinforma.backend.domain.usuario.Usuario;
import br.com.tiinforma.backend.domain.enums.Plano;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Assinatura implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Plano plano;

    @Builder.Default
    private LocalDate dataInicio = LocalDate.now();

    private LocalDate dataFim;

    private Double preco;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    @Builder.Default
    private Usuario usuario = new Usuario();

}
