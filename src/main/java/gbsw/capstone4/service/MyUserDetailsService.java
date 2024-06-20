package gbsw.capstone4.service;

import gbsw.capstone4.model.MyUserDetails;
import gbsw.capstone4.model.SignDto;
import gbsw.capstone4.repository.SignReposirtory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final SignReposirtory userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SignDto user = userRepository.findById(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new MyUserDetails(user);
    }
}