package br.com.tiinforma.backend.domain.avaliacao;

import br.com.tiinforma.backend.domain.usuarioVideoProgresso.UsuarioVideoProgresso;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Avaliacao implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer nota;
    
    private String comentario;

    @OneToMany(mappedBy = "avaliacao")
    private List<UsuarioVideoProgresso> progressos;

}
