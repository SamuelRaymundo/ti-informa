package br.com.tiinforma.backend.domain.video;

import br.com.tiinforma.backend.domain.criador.Criador;
import br.com.tiinforma.backend.domain.playlistVideo.PlaylistVideo;
import br.com.tiinforma.backend.domain.usuarioVideoProgresso.UsuarioVideoProgresso;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Video implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    @Column(unique = true)
    private String url;

    private LocalDate dataPublicacao = LocalDate.now();

    private String categoria;

    @ElementCollection
    private List <String> palavraChave;

    @ManyToOne
    @JoinColumn(name = "id_criador")
    private Criador criador;

    @OneToMany(mappedBy = "video")
    private List<PlaylistVideo> playlistVideos;

    @OneToMany(mappedBy = "video")
    private List<UsuarioVideoProgresso> progressos;
}
