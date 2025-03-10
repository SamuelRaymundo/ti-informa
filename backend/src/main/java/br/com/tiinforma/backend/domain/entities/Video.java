package br.com.tiinforma.backend.domain.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Video implements Serializable {

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

    private String palavraChave;

    @ManyToMany
    @JoinTable(name = "playlist_video",
    joinColumns = @JoinColumn(name = "id_playlist"),
    inverseJoinColumns = @JoinColumn(name = "id_video"))
    private Set<Playlist> playlists = new HashSet<>();
}
