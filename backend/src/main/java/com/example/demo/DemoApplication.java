package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
@RestController
public class DemoApplication {

	private int id = 0;
	private final Map<Integer, String> todos = new LinkedHashMap<>();
	public record TodoRecord(int id, String label){};

	public DemoApplication() {
		todos.put(++id, "Read about Camunda 7 Connector");
		todos.put(++id, "Read one article about Angular 17");
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@GetMapping("/api/v1/todos")
	public List<TodoRecord> getAllTodos() {
		return todos.entrySet().stream()
				.map(entry -> new TodoRecord(entry.getKey(), entry.getValue()))
				.collect(Collectors.toList());
	}

	@PostMapping("/api/v1/todos")
	public TodoRecord add(@RequestBody String todo) {
		todos.put(++id, todo);
		return new TodoRecord(id, todo);
	}

	@PutMapping("/api/v1/todos/{id}")
	public TodoRecord update(@PathVariable Integer id,
							 @RequestBody String todo) {
		todos.replace(id, todo);
		return new TodoRecord(id, todo);
	}

	@DeleteMapping("/api/v1/todos/{id}")
	public void update(@PathVariable Integer id) {
		todos.remove(id);
	}
}
